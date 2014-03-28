if Rails.env.development? || Rails.env.test?
  EmberCareers::Application.config.secret_key_base = ('x' * 30)
else
  EmberCareers::Application.config.secret_key_base = ENV['SECRET_TOKEN']
end
