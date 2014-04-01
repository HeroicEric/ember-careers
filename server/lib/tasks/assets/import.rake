namespace :assets do
  desc "Fetch assets from the ember app"
  task :fetch do
    puts `pwd`
    `cp -rf ../ember/dist/assets/app.css app/assets/stylesheets`
    `cp -rf ../ember/dist/assets/app.js app/assets/javascripts`
  end
end
