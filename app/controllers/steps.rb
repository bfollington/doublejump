LearnToGameDev::App.controllers :steps do
  
  layout :app
  
  # get :index, :map => '/foo/bar' do
  #   session[:foo] = 'bar'
  #   render 'index'
  # end

  # get :sample, :map => '/sample/url', :provides => [:any, :js] do
  #   case content_type
  #     when :js then ...
  #     else ...
  # end

  # get :foo, :with => :id do
  #   'Maps to url '/foo/#{params[:id]}''
  # end

  # get '/example' do
  #   'Hello world!'
  # end
  
  get :new do
    render 'steps/new'
  end

  post :new do

    @step = Step.create( :title => params[:step][:title], :body => params[:step][:body] )

    if @step.valid?
      @step.save
      render 'steps/new_success'
    else
      render 'steps/new'
    end

  end

end
