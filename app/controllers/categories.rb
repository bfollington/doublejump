LearnToGameDev::App.controllers :categories do
  
  layout :app
  
  get :index do
    @categories = Category.all
    render 'categories/index'
  end

  get :make do
    @categories = Category.all
    render 'categories/new'
  end

  get :make, :with => :id do
    @category = Category.where(:id => params[:id]).first
    render 'categories/new'
  end

  post :make, :with => :id do
    @category = Category.where(:id => params[:id]).first

    @category.name = params[:category][:name]
    @category.icon = params[:category][:icon]
    @category.colour = params[:category][:colour]

    save_category
  end

  post :make do

    @category = Category.create(
      :name => params[:category][:name],
      :icon => params[:category][:icon],
      :colour => params[:category][:colour],
    )

    save_category

  end

  get :view do

  end

end

def save_category
  if @category.valid?
    @category.save
    render 'categories/new_success'
  else
    render 'categories/new'
  end
end
