class AddLocationAndCategoryToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :location, :string, null: false
    add_column :jobs, :category, :string, null: false
  end
end
