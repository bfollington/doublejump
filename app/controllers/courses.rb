Doublejump::App.controllers :courses do

  layout :app

  get :index do
    @courses = Course.all
    render 'courses/index'
  end

  get :make do
    @lessons = Lesson.all
    @categories = Category.all
    @courses = Course.all
    @downloads = Download.all
    render 'courses/new'
  end

  get :make, :with => :slug do
    @lessons = Lesson.all
    @categories = Category.all
    @downloads = Download.all
    @courses = Course.all
    @course = Course.where(:slug => params[:slug]).first
    render 'courses/new'
  end

  post :make, :with => :slug do
    @course = Course.where(:slug => params[:slug]).first

    @course.title = params[:course][:title]
    @course.description = params[:course][:description]
    @course.account = current_account
    @course.image_url = params[:course][:image_url]
    @course.experience = params[:course][:experience]
    @course.slug = params[:course][:slug]
    @course.category = Category.find(params[:course][:category_id])
    @course.lessons = []
    @course.prerequisites = []
    @course.follow_ons = []

    save_course
  end

  post :make do

    @course = Course.create( :title => params[:course][:title],
                             :description => params[:course][:description],
                             :slug => params[:course][:slug],
                             :experience => params[:course][:experience],
                             :image_url => params[:course][:image_url],
                             :category => Category.find(params[:course][:category_id]),
                             :account => current_account
                            )

    save_course

  end

  get :view do

  end

end

def save_course
  if @course.valid?

    if list_exists(params[:course][:lessons])
      params[:course][:lessons].each do |lesson_id|
        @course.lessons.push( Lesson.find(lesson_id) )
      end
    end

    if list_exists(params[:course][:prerequisites])
      params[:course][:prerequisites].each do |prereq_id|
        @course.prerequisites.push( Course.find(prereq_id) )
      end
    end

    if list_exists(params[:course][:follow_ons])
      params[:course][:follow_ons].each do |follow_on_id|
        @course.follow_ons.push( Course.find(follow_on_id) )
      end
    end

    @course.save

    if is_ajax?
      content_type :json
      {:success => true }.to_json
    else
      render 'courses/new_success'
    end
  else

    if is_ajax?
      content_type :json
      {:success => false }.to_json
    else
      render 'courses/new'
    end

  end
end
