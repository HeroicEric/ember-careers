class SessionsController < ApplicationController
  def create
    user = User.find_or_create_from_omniauth(auth_hash)

    if user
      @data = {
        status: 'success',
        access_token: user.auth_token,
        token_type: 'bearer'
      }.to_json
    else
      message = 'There was an issue authenticating your account.'
      @data = { status: 'failure', error: message }.to_json
    end

    render :omniauth_complete, layout: false
  end

  protected
  def auth_hash
    request.env['omniauth.auth']
  end
end
