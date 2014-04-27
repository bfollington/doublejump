require 'colorize'

task :version => :environment do
  settings = Settings.first

    puts settings.version
end

task :list_steps => :environment  do
    Step.all.each do |step|
        puts step.inspect
    end
end

task :migrate => :environment do

    settings = Settings.first

    if (settings.nil?)
        settings = Settings.create(:version => 0)
        settings.save
    end

    if settings.version < current_version
        for i in ( settings.version + 1 )..current_version

            begin
                send('m_' + i.to_s)
            rescue Exception => e 
                puts 'Migration m_' + i.to_s + ' failed'.red
                puts e.backtrace.join("\n").red
            else
                puts 'Migration m_' + i.to_s + ' passed'.green
                settings.version = i
                settings.save
            end
        end
    end

    puts 'Now at: ' + 'version '.green + settings.version.to_s.green
end

def current_version
    2
end

def m_1
    puts 'MIGRATE'
end

def m_2
    puts 'MIGRATE 2'
end