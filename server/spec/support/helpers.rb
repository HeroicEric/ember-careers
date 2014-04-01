module Helpers
  module Controllers
    def mock_access_token_for(user)
      request.env['HTTP_AUTHORIZATION'] = "Token #{user.access_token}"
    end

    def json
      @json ||= JSON.parse(response.body)
    end
  end
end
