class Portrait < ActiveRecord::Base
  include AktionArticlePortraitCategories

  validates :title, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for a portrait. Choose between draft, published, featured or archived" }

  has_many :portraitizings, inverse_of: :portrait
  has_many :articles, through: :portraitizings, :source => :portraitizable,
           :source_type => 'Article'
  has_many :aktions, through: :portraitizings, :source => :portraitizable,
           :source_type => 'Aktion'

  has_one :picturizing, :as => :picturizable, inverse_of: :portrait
  has_one :media_container, through: :picturizing

  has_many :categorizings, :as => :categorizable, inverse_of: :portrait, dependent: :destroy
  has_many :categories, through: :categorizings

  has_many :article_linkings, :as => :article_linkable, inverse_of: :portrait
  has_many :articles, through: :article_linkings

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true

  after_update :update_associated_picture_acmb
  after_update :update_categories

  attr_accessor :picture_title, :new_md, :applicable_existing_categories, :main_category_id, :new_category_name

  def self.with_media_containers_for_card
    Portrait.where(status: ["published", "featured"]).includes(:picturizing, media_container: :translations)
  end

  def picturizings
    [picturizing]
  end

  def date_sorting_field
    updated_at
  end

  private

  def update_associated_picture_acmb
    if picture_title
      media_container.update(
        title: picture_title,
      )
    end
    if new_md
      media_container.update(
        title: new_md[:title],
        media: new_md[:file]
      )
    end
  end

  def update_categories
    persist_category_changes(
      self,
      "Portrait",
      applicable_existing_categories,
      main_category_id,
      new_category_name
    )
  end
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
