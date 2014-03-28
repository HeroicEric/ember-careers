class User < ActiveRecord::Base
  PROVIDERS = %w(github)

  validates :email, presence: true, uniqueness: true
  validates :provider, presence: true, inclusion: { in: PROVIDERS }
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :username, presence: true, uniqueness: true
end
