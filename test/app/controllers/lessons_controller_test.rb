require File.expand_path(File.dirname(__FILE__) + '/../../test_config.rb')

class LessonsControllerTest < Test::Unit::TestCase
  context "LessonsController" do
    setup do
      get '/'
    end

    should "return hello world text" do
      assert_equal "Hello World", last_response.body
    end
  end
end
