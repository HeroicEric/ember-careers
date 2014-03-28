class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :company, null: false
      t.string :location, null: false
      t.string :category, null: false

      t.timestamps
    end
  end
end
