require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/cross_origin'
require 'sinatra/json'
require 'active_model_serializers'

configure do
  enable :cross_origin

  set :views, 'app/views'
end

Dir[File.join(File.dirname(__FILE__), 'app', '**', '*.rb')].each do |file|
  require file
end

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/jobs/:id' do
  job = Job.find(params[:id])
  json JobSerializer.new(job)
end

get '/jobs' do
  jobs = Job.all
  json ActiveModel::ArraySerializer.new(jobs, root: :jobs)
end
