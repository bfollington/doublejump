require 'colorize'

task :deploy do
    app = "doublejump"
    remote = "git@heroku.com:#{app}.git"

    # TODO: run all tests here and only continue if they all pass

    puts "Running test suite now...".blue
    if (system "padrino rake spec") 
        puts 'Tests passed, deploying application'.green
        puts "Maintenance mode...".blue
        system "heroku maintenance:on --app #{app}"
        puts "Push commits...".blue
        system "git push #{remote} master"
        puts "Run migrations...".blue
        system "heroku run rake migrate --app #{app}"
        puts "Maintenance mode...".blue
        system "heroku maintenance:off --app #{app}"
        puts 'Deploy complete'.green
    else
        puts 'Tests failed, aborting deploy'.red
    end

    
end
