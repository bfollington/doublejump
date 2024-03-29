require 'colorize'

    task :export_markdown => :environment do

        system "rm -rf markdown_export"
        Dir.mkdir "markdown_export"

        Course.all.each do |course|

            course_title = course.slug.gsub(" ", "_").downcase

            Dir.mkdir "markdown_export/" + course_title

            course.lessons.each do |lesson|

                lesson_title = lesson.slug.gsub(" ", "_").downcase

                Dir.mkdir "markdown_export/" + course_title + "/" + lesson_title

                lesson.steps.each do |step|

                    step_title = step.slug.gsub(" ", "_").downcase

                    Dir.mkdir "markdown_export/" + course_title + "/" + lesson_title + "/" + step_title

                    step.contents.each_with_index do |content, index|

                        File.write("markdown_export/" + course_title + "/" + lesson_title + "/" + step_title + "/" + index.to_s + ".md", content.get_content)

                    end

                end

            end

        end

    end

    task :restore_dump do

        puts "\n Are you very sure you want to restore the remote database from the local ./dumps/manual_dump? [y/N]".light_blue
        answer = STDIN.gets.chomp
        if answer == "y"
            puts "\n Really? [y/N]".light_blue
            answer = STDIN.gets.chomp
            if answer == "y"
                puts "Okay, if you're sure".green
                drop_live_db
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
                drop_live_db
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
            drop_test_db
            restore_test_db "./dumps/manual_dump/latest_dump/*"
            puts "Restore complete".green
        else
            return false # Abort the rake task
        end

    end

    task :populate_development_db_deploy do

        puts "\n Are you sure you want to restore the development DB using the local ./dumps/deploy_db_dump? [y/N]".light_blue
        answer = STDIN.gets.chomp
        if answer == "y"
            drop_dev_db
            restore_dev_db "./dumps/deploy_db_dump/*"
            puts "Restore complete".green
        else
            return false # Abort the rake task
        end

    end

    task :populate_development_db do

        puts "\n Are you sure you want to restore the development DB using the local ./dumps/manual_dump? [y/N]".light_blue
        answer = STDIN.gets.chomp
        if answer == "y"
            drop_dev_db
            restore_dev_db "./dumps/manual_dump/latest_dump/*"
            puts "Restore complete".green
        else
            return false # Abort the rake task
        end

    end

    task :restore_development_db do

    puts "\n Are you sure you want to restore the development DB using the local ./dumps/development_db_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        drop_dev_db
        restore_dev_db "./dumps/development_db_dump/*"
        puts "Restore complete".green
    else
        return false # Abort the rake task
    end

end

task :populate do

    puts "\n Are you sure you want to restore the production DB using the local ./dumps/manual_dump? [y/N]".light_blue
    answer = STDIN.gets.chomp
    if answer == "y"
        drop_prod_db
        restore_prod_db "./dumps/manual_dump/latest_dump/*"
        puts "Restore complete".green
    else
        return false # Abort the rake task
    end

end

task :dump do

    system "./get_remote_dump.sh"

end

task :dump_dev_db do

    system "mongodump -h localhost:27017 -d learn_to_game_dev_development -o ./dumps/development_db_dump/latest_dump"

end

def drop_dev_db()
    system 'mongo learn_to_game_dev_development --eval "db.dropDatabase();"'
end

def drop_test_db()
    system 'mongo learn_to_game_dev_test --eval "db.dropDatabase();"'
end

def drop_prod_db()
    system 'mongo learn_to_game_dev_production --eval "db.dropDatabase();"'
end

def drop_live_db()
    # we need to add a new user to replace the one we deleted in the dump
    command_string = 'echo "db.dropDatabase();\n db.addUser({user: \"' + username + '\", pwd: \"' + password + '\", roles: [\"readWrite\", \"dbAdmin\", \"userAdmin\"]});" | mongo --host ds029328.mongolab.com --port 29328 ' + db + ' -u ' + username + ' -p ' + password
    #puts command_string
    system command_string
    puts "Dropped live db".green
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

def restore(directoryString)
    system "mongorestore -h ds029328.mongolab.com:29328 -d #{db} -u #{username} -p #{password} #{directoryString}"
end

def restore_test_db(directoryString)
    system "mongorestore -h localhost:27017 -d learn_to_game_dev_test #{directoryString}"
end

def restore_prod_db(directoryString)
    system "mongorestore -h localhost:27017 -d learn_to_game_dev_production #{directoryString}"
end

def restore_dev_db(directoryString)
    system "mongorestore -h localhost:27017 -d learn_to_game_dev_development #{directoryString}"
end
