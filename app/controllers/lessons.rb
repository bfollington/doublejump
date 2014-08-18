LearnToGameDev::App.controllers :lessons do
    
  layout :app

  get :index do
    @lessons = Lesson.all
    render 'lessons/index'
  end

  get :make do
    new_lesson
  end

  post :make do

    @lesson = Lesson.create( :title => params[:lesson][:title], :description => params[:lesson][:description], :slug => params[:lesson][:slug], :experience => params[:lesson][:experience], :account => current_account)

    populate_lists

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
    @lesson.experience = params[:lesson][:experience]
    @lesson.account = current_account
    @lesson.description = params[:lesson][:description]
    @lesson.steps = []
    @lesson.related_readings = []
    @lesson.downloads = []

    populate_lists

    if @lesson.valid?
      @lesson.save
      render 'lessons/new_success'
    else
      new_lesson
    end

  end

end

def populate_lists()
  @lesson.steps = []
  @lesson.related_readings = []
  @lesson.downloads = []

  iterable_list( params[:lesson][:steps] ).each do |step_id|
    @lesson.steps.push( Step.find(step_id) )
  end

  iterable_list( params[:lesson][:related_readings] ).each do |related_reading_id|
    @lesson.related_readings.push( RelatedReading.find(related_reading_id) )
  end

  if list_exists(params[:lesson][:downloads])
    params[:lesson][:downloads].each do |download_id|
      @lesson.downloads.push( Download.find(download_id) )
    end
  end
end