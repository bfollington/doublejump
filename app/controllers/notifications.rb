Doublejump::App.controllers :notifications do
  
  post :remove, :with => :id, :csrf_protection => false do

    content_type :json

    if current_account.nil?
        {:success => false}.to_json
    else
        notification = current_account.notifications.find(params[:id]).delete

        {:success => true}.to_json
    end
  end
  
end
