class ArticleWithArticlePictures < SimpleDelegator

  def all_the_pictures
    article_pictures.order(created_at: :desc).map { |article_picture| ArticlePictureWithMediaContainer.new(article_picture) }
  end

  def picture_for_card
    article_pictures.includes(:media_container).where(for_card: "true")
  end

  def pictures_for_carousel
    article_pictures.where(for_carousel: "true").order(created_at: :desc)
  end
end
