# Helper methods defined here can be accessed in any controller or view in the application

Doublejump::App.helpers do
  def new_lesson
    @steps = Step.all
    @related_readings = RelatedReading.all
    @downloads = Download.all

    render 'lessons/new'
  end
end
