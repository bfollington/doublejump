Doublejump::App.controllers :concepts, :cache => true do

  layout :react

  get :any, :map => '/concepts/*' do
    render 'pages/react'
  end

end
