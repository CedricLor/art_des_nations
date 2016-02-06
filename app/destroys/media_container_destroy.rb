class MediaContainerDestroy
  attr_reader :id

  def initialize(id:)
    # See FIXME 1. below
    @media_container_with_pictures = MediaContainer.includes(:article_pictures).find(id)
    @id = id
  end

  def destroy_if_associated_to_this_article_picture_only(article_picture_id)
    if @media_container_with_pictures.article_pictures.length == 1
      @media_container_with_pictures.destroy
    end
  end
end


# FIXME 1.-- If MediaContainer becomes polymorphic, will need to check on other tables
# than only article_pictures (media_container.article_pictures.length == 1)
# before destroying the picture
