set :stage, :production
set :branch, "master"

# used in case we're deploying multiple versions of the same
# app side by side. Also provides quick sanity checks when looking
# at filepaths
set :full_app_name, "#{fetch(:application)}_#{fetch(:stage)}"
set :server_name, "doublejump.io"

server '104.131.86.47', user: 'deploy', roles: %w{web app db}, primary: true

# dont try and infer something as important as environment from
# stage name.
set :rails_env, :production