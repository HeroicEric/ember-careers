class AddUserIdToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :user_id, :integer, null: false
    add_index :jobs, :user_id
  end
end
