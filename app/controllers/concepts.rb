Doublejump::App.controllers :concepts, :cache => true do

  layout :react

  get :index do
    render 'pages/react'
  end

  get :any, :map => '/concepts/*' do
    render 'pages/react'
  end

end
