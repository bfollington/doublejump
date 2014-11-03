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

        say_something "Take a database image..."

        system "./get_remote_dump.sh deploy_db_dump"

        say_something "Running test suite now..."

        if (system "padrino rake spec TESTING_DB=DEPLOY")

            puts 'Tests passed, deploying application'.green

            system "cap production deploy"

            puts 'Deploy complete'.green
        else
            puts 'Tests failed, aborting deploy'.red
        end


    end

end
