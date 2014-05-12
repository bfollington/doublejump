#!/usr/bin/env rackup
# encoding: utf-8

# This file can be used to start Padrino,
# just execute it from the command line.

require File.expand_path("../config/boot.rb", __FILE__)
require 'rack/session/moneta'

use Rack::Session::Moneta, :store => :Mongo

puts "Test"

run Padrino.application
