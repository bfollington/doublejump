Doublejump::Admin.controllers :lessons do
  get :index do
    @title = "Lessons"
    @lessons = Lesson.all
    render 'lessons/index'
  end

  get :new do
    @title = pat(:new_title, :model => 'lesson')
    @lesson = Lesson.new
    render 'lessons/new'
  end

  post :create do
    @lesson = Lesson.new(params[:lesson])
    if @lesson.save
      @title = pat(:create_title, :model => "lesson #{@lesson.id}")
      flash[:success] = pat(:create_success, :model => 'Lesson')
      params[:save_and_continue] ? redirect(url(:lessons, :index)) : redirect(url(:lessons, :edit, :id => @lesson.id))
    else
      @title = pat(:create_title, :model => 'lesson')
      flash.now[:error] = pat(:create_error, :model => 'lesson')
      render 'lessons/new'
    end
  end

  get :edit, :with => :id do
    @title = pat(:edit_title, :model => "lesson #{params[:id]}")
    @lesson = Lesson.find(params[:id])
    if @lesson
      render 'lessons/edit'
    else
      flash[:warning] = pat(:create_error, :model => 'lesson', :id => "#{params[:id]}")
      halt 404
    end
  end

  put :update, :with => :id do
    @title = pat(:update_title, :model => "lesson #{params[:id]}")
    @lesson = Lesson.find(params[:id])
    if @lesson
      if @lesson.update_attributes(params[:lesson])
        flash[:success] = pat(:update_success, :model => 'Lesson', :id =>  "#{params[:id]}")
        params[:save_and_continue] ?
          redirect(url(:lessons, :index)) :
          redirect(url(:lessons, :edit, :id => @lesson.id))
      else
        flash.now[:error] = pat(:update_error, :model => 'lesson')
        render 'lessons/edit'
      end
    else
      flash[:warning] = pat(:update_warning, :model => 'lesson', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy, :with => :id do
    @title = "Lessons"
    lesson = Lesson.find(params[:id])
    if lesson
      if lesson.destroy
        flash[:success] = pat(:delete_success, :model => 'Lesson', :id => "#{params[:id]}")
      else
        flash[:error] = pat(:delete_error, :model => 'lesson')
      end
      redirect url(:lessons, :index)
    else
      flash[:warning] = pat(:delete_warning, :model => 'lesson', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy_many do
    @title = "Lessons"
    unless params[:lesson_ids]
      flash[:error] = pat(:destroy_many_error, :model => 'lesson')
      redirect(url(:lessons, :index))
    end
    ids = params[:lesson_ids].split(',').map(&:strip)
    lessons = Lesson.find(ids)
    
    if lessons.each(&:destroy)
    
      flash[:success] = pat(:destroy_many_success, :model => 'Lessons', :ids => "#{ids.to_sentence}")
    end
    redirect url(:lessons, :index)
  end
end
