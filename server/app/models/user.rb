class User < ActiveRecord::Base
  PROVIDERS = %w(github)

  has_many :jobs, inverse_of: :user

  validates :email, presence: true, uniqueness: true
  validates :provider, presence: true, inclusion: { in: PROVIDERS }
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :username, presence: true, uniqueness: true

  before_save :set_access_token

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
  def set_access_token
    return if self.access_token.present?
    self.access_token = generate_access_token
  end

  def generate_access_token
    loop do
      token = SecureRandom.hex
      break token unless self.class.exists?(access_token: token)
    end
  end
end
