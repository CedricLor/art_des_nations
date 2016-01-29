class ArticleCreationForm
  include ActiveModel::Model

  attr_accessor :title, :teaser, :posted_at, :status, :media_file
  attr_reader :article

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
    @article = Article.create!(
      title: title,
      teaser: teaser,
      posted_at: posted_at,
      status: status
      )

    return if media_file == 'undefined'
      # media_container = MediaContainer.create!(title: media_title, \
      # author: media_author, source: media_source,\
      # creation_date: media_creation_date, media: media_file)
    media_container = MediaContainer.create!(title: title, media: media_file)

      # article_picture = ArticlePicture.create!(article_id: article.id,\
      # media_container_id: media_container.id,\
      # for_card: picture_for_card, for_carousel: picture_for_carousel)
    ArticlePicture.create!(
      article_id: article.id,
      media_container_id: media_container.id,
      for_card: 'true',
      for_carousel: 'true'
    )
  end
end
