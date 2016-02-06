class MediaContainerCreationForm
  include ActiveModel::Model

  attr_accessor :title, :media_file, :article_id, :article_picture_is_for_card, :article_picture_is_for_carousel

  def save
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
      # media_container = MediaContainer.create!(title: media_title, \
      # author: media_author, source: media_source,\
      # creation_date: media_creation_date, media: media_file)
    media_container = MediaContainer.create!(title: title, media: media_file)

      # article_picture = ArticlePicture.create!(article_id: article.id,\
      # media_container_id: media_container.id,\
      # for_card: picture_for_card, for_carousel: picture_for_carousel)
    ArticlePicture.create!(
      article_id: article_id,
      media_container_id: media_container.id,
      for_card: article_picture_is_for_card,
      for_carousel: article_picture_is_for_carousel
    )
  end
end
