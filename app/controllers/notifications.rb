LearnToGameDev::App.controllers :notifications do
  
  post :remove, :with => :id, :csrf_protection => false do
    notification = current_account.notifications.find(params[:id]).delete

    content_type :json
    {:success => true}.to_json
  end
  
end
