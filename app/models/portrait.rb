class Portrait < ActiveRecord::Base
  validates :title, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for a portrait. Choose between draft, published, featured or archived" }

  has_many :portaitizings, inverse_of: :portrait
  has_many :articles, through: :portaitizings, :source => :portraitizable,
           :source_type => 'Article'
  has_many :actions, through: :portaitizings, :source => :portraitizable,
           :source_type => 'Action'

  has_many :picturizings, :as => :picturizable, inverse_of: :portrait
  has_many :media_containers, through: :picturizings

  has_many :article_linkings, :as => :article_linkable, inverse_of: :portrait
  has_many :articles, through: :article_linkings

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true
end

# class CreatePortraits < ActiveRecord::Migration
#   def up
#     create_table :portraits do |t|
#       t.string :title, :null => false
#       t.text :body
#       t.text :teaser
#       t.string :status, :null => false

#       t.timestamps null: false
#     end
#     Portrait.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
#   end

#   def down
#     drop_table :portraits
#     Portrait.drop_translation_table!
#   end
# end
