require 'colorize'

task :deploy do
    app = "doublejump"
    remote = "git@heroku.com:#{app}.git"

    # TODO: run all tests here and only continue if they all pass

    if (system "padrino rake spec") 
        puts 'Tests passed, deploying application'.green
        system "heroku maintenance:on --app #{app}"
        system "git push #{remote} master"
        system "heroku run rake migrate --app #{app}"
        system "heroku maintenance:off --app #{app}"
        puts 'Deploy complete'.green
    else
        puts 'Tests failed, aborting deploy'.red
    end

    
end
