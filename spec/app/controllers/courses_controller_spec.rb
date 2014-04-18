require 'spec_helper'

describe "courses controller", :type => :feature do

  before do
    login_admin
  end

  after do
    logout
  end

  it "shows the course form" do
    visit "/courses/make"

    expect(page).to have_content "Course Title"
  end
end
