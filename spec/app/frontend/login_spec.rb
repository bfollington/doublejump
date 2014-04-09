require 'spec_helper'
require 'login'

describe "check login", :type => :feature do

  it "signs me in" do
    login_admin
  end

  it "signs me out" do
    logout
  end

end
