Doublejump::App.controllers :concepts, :cache => true do

  layout :thesis

  get :any, :map => '/concepts/*' do

    render 'thesis/page'
  end

end
