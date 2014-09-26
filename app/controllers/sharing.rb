Doublejump::App.controllers :sharing do
  
  layout :app
  
  get :index do
    render 'learn/index'
  end

  # Like a shared image
  get :like, :with => :shared_image do

    content_type :json
    
    puts "test"

    image = SharedImage.find(params[:shared_image])
    puts current_account.has_liked_shared_image?(image)

    if image.nil? || current_account.nil? || current_account.has_liked_shared_image?(image)
        return {success: false}.to_json 
    end

    complete = LikedSharedImage.new(shared_image: image, account: current_account)
    complete.save
    image.like!

    {success: true, like_count: image.likes}.to_json 
  end

end
