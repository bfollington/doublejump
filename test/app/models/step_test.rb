require File.expand_path(File.dirname(__FILE__) + '/../../test_config.rb')

class StepTest < Test::Unit::TestCase
  context "Step Model" do
    should 'construct new instance' do
      @step = Step.new
      assert_not_nil @step
    end
  end
end
