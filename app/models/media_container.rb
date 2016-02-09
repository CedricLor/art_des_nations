class MediaContainer < ActiveRecord::Base

  validates :media, presence: true

  has_many :picturizings, inverse_of: :media_container
  has_many :articles, through: :picturizings, :source => :picturizable,
           :source_type => 'Article'
  has_many :actions, through: :picturizings, :source => :picturizable,
           :source_type => 'Action'
  has_many :portraits, through: :picturizings, :source => :picturizable,
           :source_type => 'Portrait'

  translates :title

  has_attached_file :media,
    styles: { medium: "300x300>", thumb: "100x100>" }

  validates_attachment_content_type :media,
    content_type: /\Aimage\/.*\z/
end
