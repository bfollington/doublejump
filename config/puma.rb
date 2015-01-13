root = "#{Dir.getwd}"

bind "unix://#{root}/tmp/puma/socket"
pidfile "#{root}/tmp/puma/pid"
state_path "#{root}/tmp/puma/state"
rackup "#{root}/config.ru"

threads 8, 16
preload_app!
daemonize

activate_control_app
