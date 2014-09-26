Doublejump::App.controllers :'downloads' do
  
  layout :app
  
  get :index do
    @downloads = Download.all
    render 'downloads/index'
  end

  get :make do
    render 'downloads/new'
  end

  get :make, :with => :id do
    @download = Download.find(params[:id])
    render 'downloads/new'
  end

  post :make, :with => :id do
    @download = Download.find(params[:id])

    @download.title = params[:download][:title]
    @download.link = params[:download][:link]

    save_download
  end

  post :make do

    @download = Download.create(
      :title => params[:download][:title],
      :link => params[:download][:link]
    )

    save_download

  end

  get :view do

  end

end

def save_download
  if @download.valid?

    @download.save
    render 'downloads/new_success'
  else
    render 'downloads/new'
  end
end
