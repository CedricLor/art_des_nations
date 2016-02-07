class ArticlePicturesForm
  include ActiveModel::Model

  attr_accessor :article, :article_pictures, :media_files

  def initialize(attributes={})
    super
    @existing_article_picture_ids = article.article_pictures.map { |ap| ap.id }
    @article_pictures_to_create = []
    @article_pictures_to_update_without_media_file = []
    @article_pictures_to_update_with_media_file = []
    @article_pictures_to_update = false
    sort_article_pictures
  end

  def save_or_update
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
    update_article_pictures if @article_pictures_to_update
    save_new_article_pictures unless @article_pictures_to_create.empty?
  end

  def update_article_pictures
    ArticlePicturesUpdateForm.new(
      article: article,
      article_pictures_without_media_file: @article_pictures_to_update_without_media_file,
      article_pictures_with_media_file: @article_pictures_to_update_with_media_file,
      media_files: media_files
    ).update
  end

  def save_new_article_pictures
    # If the article_pictures are new, we are going straight to the creation of
    # MediaContainers (which will trigger the creation of the corresponding ArticlePictures)
    MediaContainersCreationForm.new(
      media_files: media_files,
      article_pictures: @article_pictures_to_create,
      article_title: article.title,
      article_id: article.id
    ).save
  end

  def article_pictures_to_update(article_picture)
    if article_picture.has_key?("stored_file_id")
      @article_pictures_to_update_with_media_file.push(article_picture)
    else
      @article_pictures_to_update_without_media_file.push(article_picture)
    end
  end

  def article_pictures_to_create(article_picture)
    @article_pictures_to_create.push(article_picture)
  end

  def sort_article_pictures
    article_pictures.each do |article_picture|
      if @existing_article_picture_ids.include?(article_picture["id"])
        @article_pictures_to_update = true
        article_pictures_to_update(article_picture)
      else
        article_pictures_to_create(article_picture)
      end # end if
    end # end do
  end # end method
end # end clas
