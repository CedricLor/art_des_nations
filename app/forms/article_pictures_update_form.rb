class ArticlePicturesUpdateForm
  include ActiveModel::Model

  attr_accessor :article, :article_pictures_without_media_file, :article_pictures_with_media_file, :media_files

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
    persist_article_pictures_without_media_files
    persist_article_pictures_with_media_files unless article_pictures_with_media_file.empty? || media_files.empty?
  end

  def persist_article_picture(media_container_id, article_picture)
    ArticlePicture.find(article_picture.fetch('id')).update(
      article_id: article.id,
      media_container_id: media_container_id,
      for_card: article_picture.fetch('for_card'),
      for_carousel: article_picture.fetch('for_carousel')
    )
  end

  def persist_article_pictures_without_media_files
    article_pictures_without_media_file.each do |article_picture|
      persist_article_picture(
        article_picture.fetch('media_container_id'),
        article_picture
      )
    end
  end

  def persist_article_pictures_with_media_files
    media_files.each do |media_file|

      article_picture = article_pictures_with_media_file.select do |ap|
        ap.fetch('stored_file_id') == media_file.keys[0].to_i
      end

      article_picture = article_picture[0]

      media_container = MediaContainer.create!(
        title: article.title,
        media: media_file.values[0]
      )

      persist_article_picture(
        media_container.id,
        article_picture
      )

    end
  end
end
