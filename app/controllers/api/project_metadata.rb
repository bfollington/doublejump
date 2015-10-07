Doublejump::App.controllers "/api", :cache => false do

  layout :none
  set :allow_disabled_csrf, true
  set :protect_from_csrf, false

  get :data, :with => [:project, :key] do
    # Get Metadata from project

    project = Project.where(slug: params[:project]).first

    send_json project.metadatas.where(key: params[:key]).first
  end

  get :all_data, :with => :project do
    # Get all Metadata from project

    result = {}

    project = Project.where(slug: params[:project]).first
    project.metadatas.each do |metadata|
      result[metadata.key] = metadata.value
    end

    send_json result
  end

  post :data, :with => [:project, :key] do
    # Store Metadata within project

    project = Project.where(slug: params[:project]).first

    # Remove old value stored for this key, then store new value
    project.metadatas.where(key: params[:key]).delete
    puts project.metadatas.inspect
    metadata = Metadata.new({key: params[:key], value: params[:value]})
    metadata.save!
    project.metadatas << metadata
    puts project.metadatas.inspect

    project.save!

    send_json({success: true})
  end

  delete :data, :with => [:project, :key] do
    # Remove Metadata from project
    project = Project.where(slug: params[:project]).first
    project.metadatas.where(key: params[:key]).delete

    send_json({success: true})
  end

end
