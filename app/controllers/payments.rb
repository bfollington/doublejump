Doublejump::App.controllers :payment do
  
    get :pause_account do

        if !current_account.nil?
            
            content_type :json
            {:success => current_account.pause!}.to_json
        else
            content_type :json
            {:success => false}.to_json
        end
    end

    get :unpause_account do

        if !current_account.nil? && current_account.can_be_unpaused?

            content_type :json
            {:success => current_account.unpause!}.to_json
        else
            content_type :json
            {:success => false}.to_json
        end

    end
  
end
