RACK_ENV = 'test' unless defined?(RACK_ENV)
require File.expand_path(File.dirname(__FILE__) + "/../config/boot")
require 'capybara/rspec'
require 'capybara/dsl'

Capybara.app = Padrino.application

RSpec.configure do |conf|
  conf.include Rack::Test::Methods

  # The goal here is before a deploy, get the prod db and migrate it, then run all tests on it
  # When run in dev mode, we get the dev db and migrate it, then run all tests on it
  if (ENV["TESTING_DB"] != "FAST")
    # Reset the test DB before running any tests
    puts "-> Blanking DB"
    Mongoid::Sessions.default.collections.select {|c| c.name !~ /system/ }.each(&:drop)

    puts "-> Populating DB using: #{ENV["TESTING_DB"]}"

    if ENV["TESTING_DB"] == "DEPLOY"
      system "mongorestore --host localhost --port 27017 --db learn_to_game_dev_test dumps/deploy_db_dump/latest_dump/learn_to_game_dev_production"
    elsif ENV["TESTING_DB"] == "MANUAL"
      system "mongorestore --host localhost --port 27017 --db learn_to_game_dev_test dumps/manual_dump/latest_dump/learn_to_game_dev_production"
    else
      system "padrino rake dump_dev_db"
      system "mongorestore --host localhost --port 27017 --db learn_to_game_dev_test dumps/development_db_dump/latest_dump/learn_to_game_dev_production"
    end

    # Perform any migrations that we don't have yet
    puts "-> Migrating DB"
    system "padrino rake migrate RACK_ENV=test"
  else
    puts "-> Skipping DB setup, run tests on current test db"
  end

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
