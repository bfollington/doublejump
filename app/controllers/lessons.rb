LearnToGameDev::App.controllers :lessons do
    
  layout :app

  get :new do
    new_lesson
  end

  post :new do

    @lesson = Lesson.create( :title => params[:lesson][:title], :description => params[:lesson][:description], :slug => params[:lesson][:slug] )

    params[:lesson][:steps].each do |step_id|
      @lesson.steps.push( Step.find(step_id) )
    end

    if @lesson.valid?
      @lesson.save
      render 'lessons/new_success'
    else
      new_lesson
    end

  end

end
