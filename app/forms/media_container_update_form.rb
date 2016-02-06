class MediaContainerUpdateForm
  include ActiveModel::Model

  attr_accessor :media_container_data

  def update
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
    md = MediaContainer.find(media_container_data.fetch('id'))
    md.update(
      title: media_container_data.fetch('title')
    )
  end
end
