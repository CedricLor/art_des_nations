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
    styles: { for_slider: "1200x500#", for_card: "300x125#" }, processors: [:cropper]

  validates_attachment_content_type :media,
    content_type: /\Aimage\/.*\z/



  attr_accessor :crop_x, :crop_y, :crop_h, :crop_w

  after_update :reprocess_media, if: :cropping?

  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_h.blank? && !crop_w.blank?
  end

  def reprocess_media
    media.assign(media)
    media.save
  end

  def media_geometry(style = :original)
    @geometry ||= {}
    media_path = (media.options[:storage] == :s3) ? media.url(style) : media.path(style)
    @geometry[style] ||= Paperclip::Geometry.from_file(media_path)
  end



  def self.for_carousel_for(picturizable_type, picturizable_id)
    MediaContainer.with_translations(I18n.locale).
      includes([picturizings: :translations]).
      where(picturizing_translations: {for_carousel: 'true'}).
      where(picturizings: {picturizable_type: picturizable_type, picturizable_id: picturizable_id})
  end
end
