require File.expand_path(File.dirname(__FILE__) + '/../../test_config.rb')

class LessonTest < Test::Unit::TestCase
  context "Lesson Model" do
    should 'construct new instance' do
      @lesson = Lesson.new
      assert_not_nil @lesson
    end
  end
end
