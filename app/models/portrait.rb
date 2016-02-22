class Portrait < ActiveRecord::Base
  include AktionArticlePortraitCategories

  validates :title, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for a portrait. Choose between draft, published, featured or archived" }

  # has_many :portraitizings, inverse_of: :portrait
  # has_many :articles, through: :portraitizings, :source => :portraitizable,
  #          :source_type => 'Article'
  # has_many :aktions, through: :portraitizings, :source => :portraitizable,
  #          :source_type => 'Aktion'

  # has_many :article_linkings, :as => :article_linkable, inverse_of: :portrait
  # has_many :articles, through: :article_linkings

  has_one :picturizing, :as => :picturizable, inverse_of: :portrait
  has_one :media_container, through: :picturizing

  has_many :categorizings, :as => :categorizable, inverse_of: :portrait, dependent: :destroy
  has_many :categories, through: :categorizings


  has_many :to_linkings, :as => :from_linkable, class_name: "Linking"
  has_many :from_linkings, :as => :to_linkable, class_name: "Linking"

  has_many :to_aktions, through: :to_linkings, source: :to_linkable, source_type: "Aktion"
  has_many :from_aktions, through: :from_linkings, source: :from_linkable, source_type: "Aktion"

  has_many :to_article, through: :to_linkings, source: :to_linkable, source_type: "Article"
  has_many :from_article, through: :from_linkings, source: :from_linkable, source_type: "Article"

  has_many :to_portraits, through: :to_linkings, source: :to_linkable, source_type: "Portrait"
  has_many :from_portraits, through: :from_linkings, source: :from_linkable, source_type: "Portrait"


  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true

  after_update :update_associated_picture_acmb
  after_update :update_categories

  attr_accessor :picture_title, :new_md, :applicable_existing_categories, :main_category_id, :new_category_name

  def self.for_home_page
    with_media_containers_for_card.where(status: ["featured"])
  end

  def self.for_portrait_list
    with_media_containers_for_card.where(status: ["published", "featured"])
  end

  def self.with_media_containers_for_card
    includes(picturizing: [:translations, media_container: :translations])
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
    if applicable_existing_categories || main_category_id || new_category_name
      persist_category_changes(
        self,
        "Portrait",
        applicable_existing_categories,
        main_category_id,
        new_category_name
      )
    end
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
