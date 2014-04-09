require 'spec_helper'

describe 'Lesson' do
  it "constructs a new instance" do
    @lesson = Lesson.new
    expect(@lesson).to be_an_instance_of(Lesson)
  end
end
