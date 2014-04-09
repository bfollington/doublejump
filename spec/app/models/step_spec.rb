require 'spec_helper'

describe 'Course' do
  it "constructs a new instance" do
    @course = Course.new
    expect(@course).to be_an_instance_of(Course)
  end
end
