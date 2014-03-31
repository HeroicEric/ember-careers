class RenameUserAuthTokenToAccessToken < ActiveRecord::Migration
  def change
    rename_column :users, :auth_token, :access_token
  end
end
