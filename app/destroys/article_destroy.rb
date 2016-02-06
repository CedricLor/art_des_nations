class ArticleDestroy


  def initialize(article_id:)
    @article_with_pictures = Article.includes(:article_pictures).find(article_id)
  end


  def destroy
    art_pics_destroy_obj = ArticlePicturesDestroy.new({article_pictures: @article_with_pictures.article_pictures})
    art_pics_destroy_obj.destroy
    @article_with_pictures.destroy

    {
      article_picture_ids: art_pics_destroy_obj.article_picture_ids,
      media_container_ids: art_pics_destroy_obj.destroyed_media_container_ids
    }
  end

end
