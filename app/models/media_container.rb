class MediaContainer < ActiveRecord::Base
  belongs_to :gallery, inverse_of: :media_containers
  translates :title, :author, :source

  has_attached_file :media,
    styles: { medium: "300x300>", thumb: "100x100>" }

  validates_attachment_content_type :media,
    content_type: /\Aimage\/.*\z/
end
