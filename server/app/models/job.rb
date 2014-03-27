class Job < ActiveRecord::Base
  CATEGORIES = %w(full-time part-time contact internship)

  validates :category, inclusion: { in: CATEGORIES }
end
