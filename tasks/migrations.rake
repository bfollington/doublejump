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

    do_migration

end

def do_migration()
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
    puts 'Migration complete'.green
end

def current_version
    6
end

def m_1
    puts 'MIGRATE'
end

def m_2
    puts 'MIGRATE 2'
end

def m_3
    # add default xp value to all steps
    Step.all.each do |step|
        step.experience = 50
        step.save
    end
end

def m_4
    # add default xp value to all lessons and courses too
    Lesson.all.each do |lesson|
        lesson.experience = 250
        lesson.save
    end

    Course.all.each do |course|
        course.experience = 2000
        course.save
    end
end

def m_5
    # Move the markdown body out of steps and into a markdown content block
    Step.all.each do |step|
        regex = /(\_\{[A-z0-9]+\}\_)+/
        markdown = MarkdownContent.new(body: step.body.gsub(regex, ''))
        step.contents << markdown
        # step.unset(:body)
        markdown.save
        step.save
    end
end

def m_6
    # Delete the body field from all steps
    Step.all.each do |step|
        step.unset(:body)
        step.save
    end
end
