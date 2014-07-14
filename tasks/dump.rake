require 'colorize'


task :restore_dump do

    puts "\n Are you very sure you want to restore the remote database from the local ./dumps/manual_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        puts "\n Really? [y/N]".light_blue
        answer = STDIN.gets.chomp
        if answer == "y"
            puts "Okay, if you're sure".green
            restore "./dumps/manual_dump/*"
            puts "Restore complete".green
        else
            return false
        end
    else
        return false # Abort the rake task
    end
    
end

task :restore_deploy_backup do

    puts "\n Are you very sure you want to restore the remote database from the deploy backup ./dumps/deploy_db_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        puts "\n Really? [y/N]".light_blue
        answer = STDIN.gets.chomp
        if answer == "y"
            puts "Okay, if you're sure".green
            restore "./dumps/deploy_db_dump/*"
            puts "Restore complete".green
        else
            return false
        end
    else
        return false # Abort the rake task
    end
    
end

task :populate_test_db do

    puts "\n Are you sure you want to restore the testing DB using the local ./dumps/manual_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        restoreTestDb "./dumps/manual_dump/*"
        puts "Restore complete".green
    else
        return false # Abort the rake task
    end
    
end

task :populate_development_db do

    puts "\n Are you sure you want to restore the development DB using the local ./dumps/manual_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        restoreDevDb "./dumps/manual_dump/*"
        puts "Restore complete".green
    else
        return false # Abort the rake task
    end
    
end

task :restore_development_db do

    puts "\n Are you sure you want to restore the development DB using the local ./dumps/development_db_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        #system 'mongo learn_to_game_dev_development --eval "db.dropDatabase();"'
        restoreDevDb "./dumps/development_db_dump/*"
        puts "Restore complete".green
    else
        return false # Abort the rake task
    end
    
end

task :dump do

    system "mongodump -h ds029328.mongolab.com:29328 -d doublejump -u doublejump -p MoBoFlo1010 -o ./dumps/manual_dump"
    
end

task :dump_dev_db do

    system "mongodump -h localhost:27017 -d learn_to_game_dev_development -o ./dumps/development_db_dump"
    
end


def restore(directoryString)
    system "mongorestore -h ds029328.mongolab.com:29328 -d doublejump -u doublejump -p MoBoFlo1010 #{directoryString}"
end

def restoreTestDb(directoryString)
    system "mongorestore -h localhost:27017 -d learn_to_game_dev_test #{directoryString}"
end

def restoreDevDb(directoryString)
    system "mongorestore -h localhost:27017 -d learn_to_game_dev_development #{directoryString}"
end