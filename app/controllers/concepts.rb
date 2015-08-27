Doublejump::App.controllers :concepts, :cache => true do

  layout :thesis

  get :any, :map => '/concepts/*' do

    if !current_account
        redirect "/login"
    end

    render 'thesis/page'
  end

end
