require 'spec_helper'
require 'login'

describe "course listing page", :type => :feature do

  it "loads the course list" do
    visit '/learn'

    expect(page).to have_field('course_filter')
  end

end
