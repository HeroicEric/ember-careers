class Job < ActiveRecord::Base
  CATEGORIES = %w(full-time part-time contract internship)

  validates :title, presence: true
  validates :description, presence: true
  validates :company, presence: true
  validates :location, presence: true
  validates :category, presence: true, inclusion: { in: CATEGORIES }

  def category=(category)
    category.downcase! if category.present?
    super(category)
  end
end
