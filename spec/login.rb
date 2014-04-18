require 'spec_helper'

def login_admin

    create_admin

    @username = "admin@voltic.com.au"
    @password = "MoBoFlo1010"

    visit '/login'

    within("#login_form") do
      fill_in 'email', :with => @username
      fill_in 'password', :with => @password
    end
    
    click_button 'Login'

    expect(page).to have_content @username

end

def login

    create_user

    @username = "user@voltic.com.au"
    @password = "MoBoFlo1010"

    visit '/login'

    within("#login_form") do
      fill_in 'email', :with => @username
      fill_in 'password', :with => @password
    end
    
    click_button 'Login'

    expect(page).to have_content @username

end

def logout

    visit '/destroy'

    visit '/profile'

    expect(page).to have_selector("#login_form")

end

def create_admin

  @username = "admin@voltic.com.au"
  @password = "MoBoFlo1010"

  @admin = Account.create(
    :email => @username,
    :password  => @password,
    :password_confirmation => @password,
    :role => "admin",
    :name => "Test",
    :surname => "Account"
  )

  @admin.save

end

def create_user

  @username = "user@voltic.com.au"
  @password = "MoBoFlo1010"

  @user = Account.create(
    :email => @username,
    :password  => @password,
    :password_confirmation => @password,
    :role => "user",
    :name => "Test",
    :surname => "Account"
  )

  @user.save

end