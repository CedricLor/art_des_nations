class MediaContainersCreationForm
  include ActiveModel::Model

  validates :media_containers, presence: true
  validates :picturizable_id, presence: true
  validates :picturizable_type, presence: true

  attr_accessor :picturizable_id, :picturizable_type, :parent, :media_containers

  def initialize(attributes={})
    super
    @parent ||= Object.const_get("#{picturizable_type}").find(picturizable_id)
    picturizable_type == "Portrait" ? populate_new_media_containers(1) : populate_new_media_containers(10)
  end

  def populate_new_media_containers(number_of_times)
    number_of_times.times do
      @parent.picturizings.build(for_carousel: 'true').create_media_container(title: "")
    end
  end
end

# {"0"=>{"title"=>"", "for_carousel"=>"true"}, "1"=>{"title"=>"", "for_carousel"=>"true"}, "2"=>{"title"=>"", "for_carousel"=>"true"}}
