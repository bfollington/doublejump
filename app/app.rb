module LearnToGameDev
  class App < Padrino::Application
    register ScssInitializer
    register Padrino::Rendering
    register Padrino::Mailer
    register Padrino::Cache
    register Padrino::Helpers
    register Padrino::Admin::AccessControl

    require 'rubygems'
    require 'aws-sdk'
    require 'securerandom'

    AWS.config(
      :access_key_id => 'AKIAIAR5NTF4NPMT7ANQ', 
      :secret_access_key => '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'
    )

    set :login_page, "/login" # determines the url login occurs

    access_control.roles_for :any do |role|
      role.protect "/profile"
      role.protect "/courses/*"
      role.protect "/lessons/*"
      role.protect "/steps/*"
      role.protect "/related-readings/*"
      role.protect "/definitions/*"
    end

    # now we add a role for users
    access_control.roles_for :users do |role|
      role.allow "/profile"
    end

    access_control.roles_for :admin do |role|
      role.allow "/profile"
      role.allow "/courses/*"
      role.allow "/lessons/*"
      role.allow "/steps/*"
    end

    enable :sessions

    case Padrino.env
      when :production then require 'newrelic_rpm'
    end

    #
    # LANDING PAGE
    # 

    get :index do
      render 'notify', :layout => :landing
    end

    get :interative, :map => '/interactive/:partial' do
        render "interactive/" + params[:partial], :layout => :blank
    end

    #
    # USER AUTHENTICATION
    #

    get :login do
      if current_account
        redirect url("/users/you")
      else
        render 'login', :layout => :learn
      end
    end

    post :login do

      account = Account.authenticate(params[:email], params[:password])

      if account
        set_current_account(account)
        redirect url(:users, :you)
      else
        session[:flash] = "Invalid email/password combination."
        redirect url(:login)
      end
    end





    #
    # USER REGISTRATION
    #

    get :register do
      render 'register', :layout => :app
    end

    post :register do
      @account = Account.create(params[:account])
      @account.role = "users"

      puts @account.to_yaml

      if (@account.valid?)
        @account.save
        set_current_account(@account)
        redirect url(:profile)
      else
        render 'register'
      end
    end




    get :manage do
      render 'manage', :layout => :app
    end



    #
    # S3 UPLOADS
    #

    get :upload do

      content_type :json
      {:html => render('upload', :layout => false), :success => true }.to_json
    end

    post :upload do
      puts params.inspect

      if params[:shared_image] == ""
        content_type :json
        return {:errors => "No file provided.", :success => false }.to_json
      end

      tempfile = params[:shared_image][:tempfile]
      filename = params[:shared_image][:filename]
      type = params[:shared_image][:type]

      random_string = SecureRandom.hex + File.extname(filename)  

      result = upload_public_file(tempfile, random_string, type)
      @file = result[:filename]
      
      content_type :json
      {:file => result[:url], :success => true }.to_json
    end

    # Called during a sharing step when an image is being uploaded.
    post :upload_image, :map => "/upload-image" do
      puts params.inspect

      # Check if image actually provided
      if params[:shared_image][:shared_image] == ""
        fail_with_error("No file provided!")
      end

      tempfile = params[:shared_image][:shared_image][:tempfile]
      type = params[:shared_image][:shared_image][:type]

      # Check filesize (fallback for JS check)
      if (File.size(tempfile) / 1048576 > 2)
        fail_with_error("This file is too large (bigger than 2MB), try compressing or resizing it.")
      end

      # Check if file is a valid image
      if !type.start_with?("image/")
        fail_with_error("Please provide a valid image file.")
      end

      # Generate a random name
      random_string = SecureRandom.hex + type.gsub("image/", ".")

      result = upload_public_file(tempfile, random_string, type)
      @file = result[:filename]
      
      content_type :json
      {:file => result[:url], :success => true }.to_json
    end






    get :styleguide do
      render "index", :layout => :styleguide
    end





    #
    # USER PROFILES
    #

    get :destroy do
      set_current_account(nil)
      redirect url(:login)
    end

    ##
    # Caching support.
    #
    # register Padrino::Cache
    # enable :caching
    #
    # You can customize caching store engines:
    #
    # set :cache, Padrino::Cache.new(:LRUHash) # Keeps cached values in memory
    # set :cache, Padrino::Cache.new(:Memcached) # Uses default server at localhost
    # set :cache, Padrino::Cache.new(:Memcached, '127.0.0.1:11211', :exception_retry_limit => 1)
    # set :cache, Padrino::Cache.new(:Memcached, :backend => memcached_or_dalli_instance)
    # set :cache, Padrino::Cache.new(:Redis) # Uses default server at localhost
    # set :cache, Padrino::Cache.new(:Redis, :host => '127.0.0.1', :port => 6379, :db => 0)
    # set :cache, Padrino::Cache.new(:Redis, :backend => redis_instance)
    # set :cache, Padrino::Cache.new(:Mongo) # Uses default server at localhost
    # set :cache, Padrino::Cache.new(:Mongo, :backend => mongo_client_instance)
    # set :cache, Padrino::Cache.new(:File, :dir => Padrino.root('tmp', app_name.to_s, 'cache')) # default choice
    #

    ##
    # Application configuration options.
    #
    # set :raise_errors, true       # Raise exceptions (will stop application) (default for test)
    # set :dump_errors, true        # Exception backtraces are written to STDERR (default for production/development)
    # set :show_exceptions, true    # Shows a stack trace in browser (default for development)
    # set :logging, true            # Logging in STDOUT for development and file for production (default only for development)
    # set :public_folder, 'foo/bar' # Location for static assets (default root/public)
    # set :reload, false            # Reload application files (default in development)
    # set :default_builder, 'foo'   # Set a custom form builder (default 'StandardFormBuilder')
    # set :locale_path, 'bar'       # Set path for I18n translations (default your_apps_root_path/locale)
    # disable :sessions             # Disabled sessions by default (enable if needed)
    # disable :flash                # Disables sinatra-flash (enabled by default if Sinatra::Flash is defined)
    # layout  :my_layout            # Layout can be in views/layouts/foo.ext or views/foo.ext (default :application)
    #

    ##
    # You can configure for a specified environment like:
    #
    #   configure :development do
    #     set :foo, :bar
    #     disable :asset_stamp # no asset timestamping for dev
    #   end
    #

    ##
    # You can manage errors like:
    #

    error 404 do
      render 'errors/404'
    end
    #
    #   error 505 do
    #     render 'errors/505'
    #   end
    #
  end
end
