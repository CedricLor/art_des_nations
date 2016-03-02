class AddPostedAtToSiteEditorials < ActiveRecord::Migration
  def up
    add_column :site_editorials, :posted_at, :datetime
    SiteEditorial.update_all(posted_at: Time.now)
    change_column_null :site_editorials, :posted_at, false
  end

  def down
    remove_column :site_editorials, :posted_at
  end
end
