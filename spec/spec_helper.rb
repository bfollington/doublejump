RACK_ENV = 'test' unless defined?(RACK_ENV)
require File.expand_path(File.dirname(__FILE__) + "/../config/boot")
require 'capybara/rspec'
require 'capybara/dsl'
 
Capybara.app = Padrino.application

RSpec.configure do |conf|
  conf.include Rack::Test::Methods

  # Reset the test DB before running any tests
  Mongoid::Sessions.default.collections.select {|c| c.name !~ /system/ }.each(&:drop)
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