Doublejump::App.controllers :concepts, :cache => true do

  layout :thesis

  get :any, :map => '/*' do

    render 'thesis/page'
  end

end
