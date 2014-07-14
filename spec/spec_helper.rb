RACK_ENV = 'test' unless defined?(RACK_ENV)
require File.expand_path(File.dirname(__FILE__) + "/../config/boot")
require 'capybara/rspec'
require 'capybara/dsl'
 
Capybara.app = Padrino.application

RSpec.configure do |conf|
  conf.include Rack::Test::Methods

  # Reset the test DB before running any tests
  Mongoid::Sessions.default.collections.select {|c| c.name !~ /system/ }.each(&:drop)

  system "mongorestore -h localhost:27017 -d learn_to_game_dev_test ./dumps/deploy_db_dump/*"
  #system "mongorestore -h localhost:27017 -d learn_to_game_dev_test ./dumps/manual_dump/*"

  if false
    Capybara.current_driver = :selenium
    Capybara.javascript_driver = :selenium
    Capybara.run_server = true
    Capybara.server_port = 7000
    Capybara.app_host = "http://localhost:#{Capybara.server_port}"
  end

end

# You can use this method to custom specify a Rack app
# you want rack-test to invoke:
#
#   app RspecTest::App
#   app RspecTest::App.tap { |a| }
#   app(RspecTest::App) do
#     set :foo, :bar
#   end
#
def app(app = nil, &blk)
  @app ||= block_given? ? app.instance_eval(&blk) : app
  @app ||= Padrino.application
end
