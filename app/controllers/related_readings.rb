LearnToGameDev::App.controllers :'related-readings' do
  
  layout :app
  
  get :index do
    @related_readings = RelatedReading.all
    render 'related_readings/index'
  end

  get :make do
    render 'related_readings/new'
  end

  get :make, :with => :id do
    @related_reading = RelatedReading.find(params[:id])
    render 'related_readings/new'
  end

  post :make, :with => :id do
    @related_reading = RelatedReading.find(params[:id])

    @related_reading.title = params[:related_reading][:title]
    @related_reading.link = params[:related_reading][:link]

    save_related_reading
  end

  post :make do

    @related_reading = RelatedReading.create(
      :title => params[:related_reading][:title],
      :link => params[:related_reading][:link]
    )

    save_related_reading

  end

  get :view do

  end

end

def save_related_reading
  if @related_reading.valid?

    @related_reading.save
    render 'related_readings/new_success'
  else
    render 'related_readings/new'
  end
end
