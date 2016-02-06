class MediaContainersUpdateForm
  include ActiveModel::Model

  attr_accessor :media_containers_data

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
    media_containers_data.each do |media_container_data|
      MediaContainerUpdateForm.new(
        media_container_data: media_container_data
      ).update
    end # End do
  end # End persist!
end # End class
