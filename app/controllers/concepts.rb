Doublejump::App.controllers :concepts, :cache => true do

  layout :react

  get :any, :map => '/concepts/*' do

    if !current_account
        redirect "/login"
    end

    render 'pages/react'
  end

end
