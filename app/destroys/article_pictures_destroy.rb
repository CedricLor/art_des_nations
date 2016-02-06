class ArticlePicturesDestroy
  attr_reader :article_picture_ids, :destroyed_media_container_ids

  def initialize(options = {})
    @article_pictures = options[:article_pictures] || ArticlePicture.where('id' => options[:ids])
    @article_picture_ids = options[:ids] || @article_pictures.map { |art_pic| art_pic.id }
    @destroyed_media_container_ids = []
  end


  def destroy

    @article_pictures.each do |article_picture|

      @destroyed_media_container_ids = \
        ArticlePictureDestroy.new(article_picture: article_picture).
          destroy_with_media_container_acmb(
            @destroyed_media_container_ids
          )

    end
  end

end
