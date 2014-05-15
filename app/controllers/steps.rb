LearnToGameDev::App.controllers :steps do
  
  layout :app

  get :index do
    @steps = Step.all
    render 'steps/index'
  end
  
  get :make do
    render 'steps/new'
  end

  post :make do

    @step = Step.create(
      :title => params[:step][:title],
      :body => process_body( params[:step][:body] ),
      :slug => params[:step][:slug],
      :account => current_account,
      :is_sharing_step => params[:step][:is_sharing_step]
    )

    if @step.valid?
      @step.save
      render 'steps/new_success'
    else
      render 'steps/new'
    end

  end

  get :make, :with => :slug do

    @step = Step.where( :slug => params[:slug] ).first

    render 'steps/new'
  end

  post :make, :with => :slug do

    @step = Step.where( :slug => params[:slug] ).first

    @step.title = params[:step][:title]
    @step.slug = params[:step][:slug]
    @step.account = current_account
    @step.is_sharing_step = params[:step][:is_sharing_step]
    @step.body = process_body( params[:step][:body] )

    if @step.valid?
      @step.save
      render 'steps/new_success'
    else
      puts @step.errors.full_messages.inspect
      render 'steps/new'
    end

  end

end

def process_body(body)

  re = Step.id_regex
  highest_id = 0
  match_number = 0

  new_body = ""

  # Scan the body and find the highest ID mentioned
  body.scan(re).each do |match|
    # Convert to an integer
    match_number = match[0].gsub("_", "").gsub("_", "").to_i

    # Basic max finding
    if (match_number > highest_id)
      highest_id = match_number
    end
  end

  # Parse the body at any paragraph breaks
  body.split(/\r?\n\r?\n/).each do |para|

    # If there is no ID for this paragraph
    if (para =~ re).nil?
      # We add one in
      new_body += para + " _{" + (highest_id + 1).to_s + "}_" + "\n\n"
      # And bump up the highest ID for the next match
      highest_id += 1
    else
      new_body += para + "\n\n"
    end
  end

  new_body

end
