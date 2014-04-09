require 'spec_helper'

describe 'Step' do
  it "constructs a new instance" do
    @step = Step.new
    expect(@step).to be_an_instance_of(Step)
  end
end
