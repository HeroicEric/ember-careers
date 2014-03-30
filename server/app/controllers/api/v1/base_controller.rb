class Api::V1::BaseController < ApplicationController
  protected
  def ensure_valid_auth_token!
    authenticate_token || render_unauthorized
  end

  def authenticate_token
    auth_header = request.headers['HTTP_AUTHORIZATION']

    if auth_header.present?
      token = auth_header.split.last
      user = User.find_by(auth_token: token)

      if user.present?
        self.current_user = user
      end

      user
    end
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Application"'
    render json: 'Bad credentials', status: :unauthorized
  end
end
