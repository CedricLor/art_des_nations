class MediaContainer < ActiveRecord::Base
  has_many :article_pictures, inverse_of: :media_container
  has_many :articles, through: :article_pictures

  translates :title, :author, :source

  has_attached_file :media,
    styles: { medium: "300x300>", thumb: "100x100>" }

  validates_attachment_content_type :media,
    content_type: /\Aimage\/.*\z/
end
