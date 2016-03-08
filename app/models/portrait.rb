class Portrait < ActiveRecord::Base
  include MainModelsModifiers
  include Linkings
  include AktionArticlePortraitCategories

  validates :title, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for a portrait. Choose between draft, published, featured or archived" }

  with_options unless: "(status == 'draft' || 'archived') || media_container.present?" do |portrait|
    portrait.validates :new_md, presence: {
      in: true,
      message: I18n.t(:media_container_presence_required_validation_message, default: "You have choosen to publish your portrait. A portrait may not be validly published without a picture.")
    }
    portrait.validate :has_an_attached_file
  end


  has_many :picturizings, as: :picturizable, inverse_of: :portrait
  has_many :media_containers, through: :picturizings

  # has_one :picturizing, :as => :picturizable, inverse_of: :portrait
  # has_one :media_container, through: :picturizing

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

  after_create :add_new_picture_to_portrait, if: "new_md && new_md[:file].present?"
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
    includes(picturizings: [:translations, media_container: :translations])
  end

  def picturizing
    picturizings.last
  end

  def media_container
    media_containers.last
  end

  # def picturizings
  #   picturizing.present? ? [picturizing] : []
  # end

  def date_sorting_field
    updated_at
  end


  private


  def has_an_attached_file
    if new_md[:file].blank?
      errors.add(:new_md, I18n.t(:media_container_presence_of_file_required_validation_message, default: "You have not attached any picture to your portrait."))
    end
  end

  def update_associated_picture_acmb
    if picture_title
      media_container.update(
        title: picture_title,
      )
    end
    if new_md && new_md[:file].present?
      add_new_picture_to_portrait
    end
  end

  def add_new_picture_to_portrait
    Picturizing.destroy_all(picturizable_id: id, picturizable_type: "Portrait")
    created_md = MediaContainer.create(
      title: new_md[:title],
      media: new_md[:file]
    )
    created_md.picturizings.create(
      picturizable_id: id,
      picturizable_type: "Portrait",
      for_carousel: "true",
      for_card: "true"
    )
  end

  def update_categories
    if applicable_existing_categories || main_category_id || new_category_name
      persist_categories(
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
