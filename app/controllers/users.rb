Doublejump::App.controllers :users do
  
    require "stripe"

    get :you do
        @yours = true
        @account = current_account
        render "users/profile", :layout => :learn
    end

    get :index, :map => '/users/profile/:username' do
        @yours = false
        @account = Account.where(:username => params[:username]).first

        if @account.nil?
            halt 404
        end

        render "users/profile", :layout => :learn
    end

    get :edit_profile, :map => '/users/you/edit-profile' do

        @account = current_account

        render "users/edit_profile", :layout => :learn
    end

    post :edit_profile, :map => '/users/you/edit-profile' do

        @account = current_account

        @account.username = params[:account][:username]
        @account.bio = params[:account][:bio]
        @account.avatar = params[:account][:avatar]

        if @account.valid?
            @account.save

            session[:flash] = "Profile updated successfully."
        else
            session[:flash] = "Sorry, there were some problems with what you changed."
        end 

        render "users/edit_profile", :layout => :learn
    end

    get :account_settings, :map => '/users/you/account-settings' do

        @account = current_account

        render "users/account_settings", :layout => :learn
    end

    post :account_settings, :map => '/users/you/account-settings' do

        @account = current_account

        # Update the billing details for this account
        if !@account.stripe_customer_id

            Stripe.api_key = stripe_secret_key

            # Get the credit card details submitted by the form
            token = params[:stripeToken]

            # Create a Customer
            customer = Stripe::Customer.create(
                :card => token,
                :plan => "test_subscription",
                :email => params[:account][:email]
            )

            @account.stripe_customer_id = customer.id

        else
            customer = Stripe::Customer.retrieve(@account.stripe_customer_id)
            customer.card = params[:stripeToken]
        end

        @account.name = params[:account][:name]
        @account.surname = params[:account][:surname]
        @account.email = params[:account][:email]

        if !params[:account][:password_confirmation].empty?
            @account.password = params[:account][:password]
            @account.password_confirmation = params[:account][:password_confirmation]
        end

        if @account.valid?
            @account.save

            session[:flash] = "Settings updated successfully."
        else
            session[:flash] = "Sorry, there were some problems with your account settings."
        end 

        render "users/account_settings", :layout => :learn
    end


end
