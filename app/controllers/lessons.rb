LearnToGameDev::App.controllers :lessons do
    
  layout :app

  get :make do
    new_lesson
  end

  post :make do

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

  get :make, :with => :slug do
    @lesson = Lesson.where( :slug => params[:slug]).first
    new_lesson
  end

  post :make, :with => :slug do

    @lesson = Lesson.where( :slug => params[:slug]).first

    @lesson.title = params[:lesson][:title]
    @lesson.slug = params[:lesson][:slug]
    @lesson.description = params[:lesson][:description]
    @lesson.steps = []

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
