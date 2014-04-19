LearnToGameDev::App.controllers :comments do
  

   #
  # COMMENTS
  #

  get :get_comments, :map => '/comments/get/:slug/:group' do

    @step = Step.where(slug: params[:slug]).first
    @group = params[:group]
    @comments = @step.comments.where(group: params[:group])

    content_type :json
    {:html => render('learn/comments', :layout => false), :success => true }.to_json
  end

  post :submit_comment, :map => "/comments/submit/:slug/:group" do

    @step = Step.where(slug: params[:slug]).first
    comment = Comment.new(:body => params[:comment][:body], :account => current_account, :group => params[:group])
    @group = params[:group]

    if comment.valid?
      @step.comments << comment

      # get comments after save to include new one
      @comments = @step.comments.where(group: params[:group])

      content_type :json
      {:html => render('learn/comments', :layout => false), :success => true }.to_json
    else
      content_type :json
      {:errors => comment.errors.messages, :success => false }.to_json
    end
  end

  get :delete_comment, :map => '/comments/delete/:slug/:id' do

    if current_account.role != "admin"
      return fail_with_json
    end

    step = Step.where(slug: params[:slug]).first
    fail_if_nil step

    if step.nil?
      return fail_with_json
    end

    comment = step.comments.find( params[:id] )
    fail_if_nil comment

    comment.destroy

    content_type :json
    {:success => true }.to_json
  end

  get :report_comment, :map => '/comments/report/:slug/:id' do

    step = Step.where(slug: params[:slug]).first
    fail_if_nil step

    if step.nil?
      return fail_with_json
    end

    comment = step.comments.find( params[:id] )

    fail_if_nil comment

    if !current_account.reported_comments.where(:comment => comment).first.nil?
      return fail_with_json
    end

    comment.inc(:times_reported, 1)
    reported_comment = ReportedComment.new(:comment => comment, :account => current_account)
    comment.reported_comments << reported_comment

    content_type :json
    {:success => true }.to_json
  end
    

end
