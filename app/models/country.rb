class Country < ActiveRecord::Base
  validates :name, presence: true
  validates :title, presence: true
  validates :editorial, presence: true

  has_many :actions, inverse_of: :country, dependent: :destroy

  has_many :external_linkings, :as => :external_linkable, inverse_of: :country
  has_many :external_links, through: :external_linkings

  translates :name, :title, :editorial, :fallbacks_for_empty_translations => true
end




# class CreateCountries < ActiveRecord::Migration
#   def up
#     create_table :countries do |t|
#       t.string :name, :null => false
#       t.text :country_editorial

#       t.timestamps null: false
#     end
#     Country.create_translation_table! :name => :string, :country_editorial => :text
#   end

#   def down
#     drop_table :countries
#     Country.drop_translation_table!
#   end
# end
