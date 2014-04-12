class Job < ActiveRecord::Base
  CATEGORIES = %w(full-time part-time contract internship)

  belongs_to :user, inverse_of: :jobs

  validates :category, presence: true, inclusion: { in: CATEGORIES }
  validates :company, presence: true
  validates :description, presence: true
  validates :location, presence: true
  validates :title, presence: true
  validates :user, presence: true

  def category=(category)
    category.downcase! if category.present?
    super(category)
  end

  def self.chronological
    order(created_at: :desc)
  end
end
