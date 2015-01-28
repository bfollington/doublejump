source 'https://rubygems.org'

# Distribute your app as a gem
# gemspec

# Server requirements
# gem 'thin' # or mongrel
# gem 'trinidad', :platform => 'jruby'

# Optional JSON codec (faster performance)
# gem 'oj'

#rack server
gem 'unicorn'
gem 'puma'

# Project requirements
gem 'rake'
gem 'colorize'
gem 'rest-client'

# Component requirements
gem 'bcrypt-ruby', :require => 'bcrypt'
gem 'sass'
gem 'haml'
gem 'slim'
gem 'mustache'
gem 'mongoid', '~>4.0.0'

# Session management
gem 'moneta'

# analytics
gem 'newrelic_rpm'

# billing
gem 'stripe', :git => 'https://github.com/stripe/stripe-ruby'

# Test requirements
group :test do
	gem 'rspec'
	gem 'capybara'
	gem 'rack-test', :require => 'rack/test'
	gem 'selenium-webdriver'
end

# Padrino Stable Gem
gem 'padrino', '0.12.3'

# Or Padrino Edge
# gem 'padrino', :github => 'padrino/padrino-framework'

# Or Individual Gems
# %w(core gen helpers cache mailer admin).each do |g|
#   gem 'padrino-' + g, '0.12.0'
# end

# Markdown
gem 'rdiscount'

# AWS
gem 'aws-sdk'

group :development do
    gem 'mina'
end
