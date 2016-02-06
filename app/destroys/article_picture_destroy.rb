class ArticlePictureDestroy

  def initialize(options={})
    @article_picture = options[:article_picture] || ArticlePicture.find(options[:id])
    @id = options[:id] || @article_picture.id
    @destroyed_media_container_id = @article_picture.media_container_id
  end

  def destroy_with_media_container_acmb(media_container_ids)
    media_container_ids << @article_picture.media_container_id if destroy_associated_media_container
    destroy

    media_container_ids
  end

  private

  def destroy
    @article_picture.destroy
  end

  def destroy_associated_media_container
    MediaContainerDestroy.new(id: @article_picture.media_container_id).
      destroy_if_associated_to_this_article_picture_only(@id)
  end
end
