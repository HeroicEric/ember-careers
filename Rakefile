require 'rake'

task :run do
  pids = [
    spawn("cd server && rails s"),
    spawn("cd ember && ember server"),
  ]

  trap "INT" do
    Process.kill "INT", *pids
    exit 1
  end

  loop do
    sleep 1
  end
end

task :deploy do
  sh 'git checkout pre-deploy'
  sh 'git merge master'

  # Build and copy assets to server
  sh 'cd ember && ember build production && cd ../'
  sh 'cp -rf ember/dist/assets/app.css server/app/assets/stylesheets'
  sh 'cp -rf ember/dist/assets/app.js server/app/assets/javascripts'

  # Commit changes if necessary
  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  # Push server code production remote
  sh 'git subtree push -P server production master'

  # Switch back to previous branch
  sh 'git checkout -'
end
