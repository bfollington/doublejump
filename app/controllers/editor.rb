Doublejump::App.controllers :editor do

  layout :app

  get :index do
    @courses = Course.all
    render 'editor/index'
  end

  get :course, :map => "/editor/course/:course_id/" do
    @course = Course.find(params[:course_id])
    @lessons = Lesson.all
    @courses = Course.all
    @categories = Category.all

    render 'editor/course'
  end

  get :lesson, :map => "/editor/lesson/:course_id/:lesson_id" do
    @lesson = Lesson.find(params[:lesson_id])
    @course = Course.find(params[:course_id])
    @steps = Step.all
    @related_readings = RelatedReading.all
    @downloads = Download.all

    render 'editor/lesson'
  end

  get :step, :map => "/editor/step/:course_id/:lesson_id/:step_id" do
    @course = Course.find(params[:course_id])
    @lesson = Lesson.find(params[:lesson_id])
    @step = Step.find(params[:step_id])
    @steps = Step.all

    render 'editor/step'

  end

end
