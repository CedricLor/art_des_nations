class AddIndexToSiteEditorialTranslations < ActiveRecord::Migration
  def change
    add_index :site_editorial_translations, [:status, :locale]
  end
end
