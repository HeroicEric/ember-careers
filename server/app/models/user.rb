class User < ActiveRecord::Base
  PROVIDERS = %w(github)

  validates :email, presence: true, uniqueness: true
  validates :provider, presence: true, inclusion: { in: PROVIDERS }
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :username, presence: true, uniqueness: true

  before_save :set_auth_token

  class << self
    def find_or_create_from_omniauth(auth)
      where(auth.slice("provider", "uid")).first_or_create! do |u|
        u.provider = auth.provider
        u.uid = auth.uid
        u.email = auth.info.email
        u.username = auth.info.nickname
      end
    end
  end

  private
  def set_auth_token
    return if self.auth_token.present?
    self.auth_token = generate_auth_token
  end

  def generate_auth_token
    loop do
      token = SecureRandom.hex
      break token unless self.class.exists?(auth_token: token)
    end
  end
end
