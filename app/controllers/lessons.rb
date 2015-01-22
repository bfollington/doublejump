Doublejump::App.controllers :lessons do

  layout :app

  get :index do
    @lessons = Lesson.all
    render 'lessons/index'
  end

  get :make do
    new_lesson
  end

  post :make do

    @lesson = Lesson.create(
        :title => params[:lesson][:title],
        :description => params[:lesson][:description],
        :final_message => params[:lesson][:final_message],
        :slug => params[:lesson][:slug],
        :experience => params[:lesson][:experience],
        :account => current_account
    )

    populate_lists

    if @lesson.valid?
      @lesson.save
      render 'lessons/new_success'
    else
      new_lesson
    end

  end

  post :update_order, :with => :lesson_id do

    lesson = Lesson.find(params[:lesson_id])

    lesson.steps = []

    iterable_list( params[:lesson][:steps] ).each do |step_id|
      lesson.steps.push( Step.find(step_id) )
    end

    content_type :json
    {success: true, message: "I'll do it later."}.to_json
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
    @lesson.final_message = params[:lesson][:final_message]
    @lesson.steps = []
    @lesson.related_readings = []
    @lesson.downloads = []

    populate_lists

    if @lesson.valid?
      @lesson.save

      if is_ajax?
        content_type :json
        {:success => true }.to_json
      else
        render 'lessons/new_success'
      end

    else

      if is_ajax?
        content_type :json
        {:success => false }.to_json
      else
        new_lesson
      end

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
