require 'colorize'

def say_something(thing)
    puts "\n"
    puts thing.light_blue
    puts "==========================\n".light_blue
end

task :up do
    system "mongod &"
    system "padrino s"
end

# Disable these tasks on heroku
if ENV["DEBUG"] != 'false'

    task :deploy do

        app = "doublejump"
        remote = "git@heroku.com:#{app}.git"

        # TODO: run all tests here and only continue if they all pass

        say_something "Take a database image..."

        system "mongodump -h ds029328.mongolab.com:29328 -d doublejump -u doublejump -p MoBoFlo1010 -o ./dumps/deploy_db_dump"

        say_something "Running test suite now..."

        if (system "padrino rake spec TESTING_DB=DEPLOY") 

            puts 'Tests passed, deploying application'.green
            
            say_something "Maintenance mode..."
            
            system "heroku maintenance:on --app #{app}"

            say_something "Push commits..."
            
            system "git push #{remote} master"
            
            say_something "Run migrations remotely..."
            
            system "heroku run rake migrate --app #{app}"
            
            say_something "Maintenance mode..."
            
            system "heroku maintenance:off --app #{app}"
            puts 'Deploy complete'.green
        else
            puts 'Tests failed, aborting deploy'.red
        end

        
    end

end
