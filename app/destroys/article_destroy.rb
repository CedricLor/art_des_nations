class ArticleDestroy

  def initialize(article_id:)
    @article_with_pictures = Article.includes(:article_pictures).find(article_id)
  end

  def destroy
    article_pictures = @article_with_pictures.article_pictures
    article_picture_ids = []
    media_container_ids = []
    article_pictures.each do |article_picture|
      article_picture_ids << article_picture.id
      md = MediaContainer.includes(:article_pictures).find(article_picture.media_container_id)
      # FIXME -- If MediaContainer becomes polymorphic, will need to check on other tables
      # than only article_pictures (media_container.article_pictures.length == 1)
      # before destroying the picture
      return if md.article_pictures.length != 1
      media_container_ids << md.id
      md.destroy
    end
    @article_with_pictures.destroy
    { article_picture_ids: article_picture_ids, media_container_ids: media_container_ids }
  end
end
