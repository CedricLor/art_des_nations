class PicturizingsDestroy

  def self.destroy_with_content(picturizable_id, picturizable_type)
    byebug
    @picturizings_to_destroy = Picturizing.where(
      picturizable_id: picturizable_id,
      picturizable_type: picturizable_type
    )
    destroy_picturizings
  end

  def self.destroy_with_media_container(media_container_id)
    @picturizings_to_destroy = Picturizing.where(
      media_container_id: media_container_id
    )
    destroy_picturizings
  end

  private

  def self.destroy_picturizings
    byebug
    @picturizings_to_destroy.each do |picturizing|
      if picturizing.media_container.picturizings.size <= 1
        picturizing.media_container.destroy
      end
      picturizing.destroy
    end
  end
end
