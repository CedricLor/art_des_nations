class Action < ActiveRecord::Base
  validates :country_id, presence: true
  validates :title, presence: true
  validates :posted_at, presence: true
  validates :action_date, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an action. Choose between draft, published, featured or archived" }

  default_scope { order(action_date: :desc) }

  has_many :portraitizings, :as => :portraitizable, inverse_of: :action
  has_many :portraits, through: :portraitizings

  has_many :picturizings, :as => :picturizable, inverse_of: :action
  has_many :media_containers, through: :picturizings

  has_many :categorizings, :as => :categorizable, inverse_of: :action
  has_many :categories, through: :categorizings

  has_many :article_linkings, :as => :article_linkable, inverse_of: :action
  has_many :articles, through: :article_linkings

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true
end


# class CreateActions < ActiveRecord::Migration
#   def up
#     create_table :actions do |t|
#       t.integer :country_id, :null => false
#       t.string :title, :null => false
#       t.text :body
#       t.text :teaser
#       t.string :status, :null => false
#       t.datetime :posted_at, :null => false
#       t.datetime :action_date, :null => false

#       t.timestamps null: false
#     end
#     Action.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
#   end

#   def down
#     drop_table :actions
#     Action.drop_translation_table!
#   end
# end
