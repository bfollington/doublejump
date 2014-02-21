require File.expand_path(File.dirname(__FILE__) + '/../../test_config.rb')

class CourseTest < Test::Unit::TestCase
  context "Course Model" do
    should 'construct new instance' do
      @course = Course.new
      assert_not_nil @course
    end
  end
end
