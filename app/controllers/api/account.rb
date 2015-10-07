Doublejump::App.controllers "/api", :cache => false do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

  post :auth do

    data = get_body
    account = Account.authenticate(data["email"], data["password"])

    if account
      set_current_account(account)
      send_json({ success: true })
    else
      send_json({ success: false, error: "Invalid email and password combination" })
    end

  end

  post :unauth do

      set_current_account(nil)
      send_json({ success: true })

  end

  get :account do

      if !current_account.nil?
        send_json current_account.to_hash
      else
        send_json({success: false, error: "Not logged in"})
      end

  end

  post :register do

    data = get_body

    account = Account.create(data)
    account.role = "users"

    puts account.to_yaml

    if (account.valid?)
      account.save
      set_current_account(account)
      send_json({success: true})
    else
      send_json({success: false, errors: account.errors.messages})
    end
  end


end
