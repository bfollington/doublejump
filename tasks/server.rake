
namespace :server do
  task :start, :e do |t, args|
    args.with_defaults(:e => :production)

    pid = fork do
      system "bundle exec puma -e #{args[:e]}"
    end

    Process.detach( pid )
    puts "Puma started with pid #{pid}."
  end

  task :stop do
    pid = `cat tmp/puma/pid`
    pid = pid.strip
    if ( pid == "" )
      puts "No server instance running..."
    else
      system "pumactl -p #{pid} stop"
      puts "Puma stopped at pid #{pid}."
    end
  end

  task :restart, :e do |t, args|

    args.with_defaults(:e => :production)

    pid = `cat tmp/puma/pid`
    pid = pid.strip
    if ( pid == "" )
      puts "No server instance running..."
    else
      system "pumactl -p #{pid} stop"
      system "pumactl start -e #{args[:e]}"
      puts "Puma restarted at pid #{pid}."
    end
  end
end
