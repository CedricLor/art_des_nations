class MediaContainer < ActiveRecord::Base

  validates :media, presence: true

  has_many :picturizings, inverse_of: :media_container
  has_many :articles, through: :picturizings, :source => :picturizable,
           :source_type => 'Article'
  has_many :aktions, through: :picturizings, :source => :picturizable,
           :source_type => 'Aktion'
  has_many :portraits, through: :picturizings, :source => :picturizable,
           :source_type => 'Portrait'

  translates :title

  has_attached_file :media,
    styles: { for_slider: "1200x500#", for_card: "300x125#" }

  validates_attachment_content_type :media,
    content_type: /\Aimage\/.*\z/

  def self.for_carousel_for(picturizable_type, picturizable_id)
    MediaContainer.with_translations(I18n.locale).
      includes([picturizings: :translations]).
      where(picturizing_translations: {for_carousel: 'true'}).
      where(picturizings: {picturizable_type: picturizable_type, picturizable_id: picturizable_id})
  end
end
