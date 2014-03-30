class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  if Rails.env.production?
    protect_from_forgery with: :exception
  end

  protected
  def current_user=(user)
    @current_user = user
  end

  def current_user
    @current_user
  end
end
