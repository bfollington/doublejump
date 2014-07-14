require 'colorize'

task :deploy do
    app = "doublejump"
    remote = "git@heroku.com:#{app}.git"

    # TODO: run all tests here and only continue if they all pass

    puts "\n"
    puts "Running test suite now...".light_blue
    puts "==========================\n".light_blue

    if (system "padrino rake spec") 

        puts 'Tests passed, deploying application'.green
        
        puts "\n"
        puts "Maintenance mode...".light_blue
        puts "==========================\n".light_blue
        
        system "heroku maintenance:on --app #{app}"
        
        puts "\n"
        puts "Take a database image..."
        puts "==========================\n".light_blue

        system "mongodump -h ds029328.mongolab.com:29328 -d doublejump -u doublejump -p MoBoFlo1010 -o ./deploy_db_dump"

        puts "\n"
        puts "Push commits...".light_blue
        puts "==========================\n".light_blue
        
        system "git push #{remote} master"
        
        puts "\n"
        puts "Run migrations...".light_blue
        puts "==========================\n".light_blue
        
        system "heroku run rake migrate --app #{app}"
        
        puts "\n"
        puts "Maintenance mode...".light_blue
        puts "==========================\n".light_blue
        
        system "heroku maintenance:off --app #{app}"
        puts 'Deploy complete'.green
    else
        puts 'Tests failed, aborting deploy'.red
    end

    
end
