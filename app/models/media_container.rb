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
    md_ids = MediaContainer.connection.select_all("SELECT media_containers.id FROM media_containers INNER JOIN picturizings ON media_containers.id = picturizings.media_container_id INNER JOIN picturizing_translations ON picturizings.id = picturizing_translations.picturizing_id WHERE for_carousel = 'true' AND picturizable_type = '#{picturizable_type}' AND picturizable_id = #{picturizable_id}").rows.flatten
    MediaContainer.find(md_ids)
  end

end
