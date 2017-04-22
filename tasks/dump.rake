require 'colorize'

task :restore_development_db, [:db_path] do |t, args|

    puts "\n Are you sure you want to restore the development DB using the local ./dumps/development_db_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        drop_dev_db

        if args[:db_path].nil?
            restore_dev_db "./dumps/development_db_dump/l"
        else
            restore_dev_db "./#{args[:db_path]}"
        end


        puts "Restore complete".green
    else
        return false # Abort the rake task
    end

end

task :dump_dev_db do

    system "mongodump -h localhost:27017 -d learn_to_game_dev_development -o ./dumps/development_db_dump/latest_dump"

end

def drop_dev_db()
    system 'mongo learn_to_game_dev_development --eval "db.dropDatabase();"'
end

def db()
    'doublejump'
end

def username()
    'doublejump'
end

def password()
    'MoBoFlo1010'
end

def restore_dev_db(directoryString)
    puts "mongorestore -h localhost:27017 -d learn_to_game_dev_development #{directoryString}"
    system "mongorestore -h localhost:27017 -d learn_to_game_dev_development #{directoryString}"
end
