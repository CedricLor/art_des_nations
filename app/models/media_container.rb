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
    styles: { for_slider: "940x392#", medium: "300x300#", for_card: "300x150#", thumb: "100x100#" }

  validates_attachment_content_type :media,
    content_type: /\Aimage\/.*\z/
end


# Format d'images:
# 1200 x 500
# thumb: 300 x proportionel
