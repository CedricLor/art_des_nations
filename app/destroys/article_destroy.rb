class ArticleDestroy

  def initialize(article_id:)
    @article_with_pictures = Article.includes(:article_pictures).find(article_id)
    destroy
  end

  def destroy
    article_pictures = @article_with_pictures.article_pictures
    article_pictures.each do |article_picture|
      md = MediaContainer.includes(:article_pictures).find(article_picture.media_container_id)
      # FIXME -- If MediaContainer becomes polymorphic, will need to check on other tables
      # than only article_pictures (media_container.article_pictures.length == 1)
      # before destroying the picture
      md.destroy if media_container.article_pictures.length == 1
    end
    @article_with_pictures.destroy
  end
end
