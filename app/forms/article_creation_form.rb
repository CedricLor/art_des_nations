class ArticleCreationForm
  include ActiveModel::Model

  attr_accessor :article_title, :article_teaser, :article_posted_at, :article_status, :media_file

  def persisted?
    false
  end

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
    # article = Article.create!(title: article_title, teaser: article_teaser, body: article_body, posted_at: article_posted_at, status: article_status)
    article = Article.create!(title: article_title, teaser: article_teaser, posted_at: article_posted_at, status: article_status)

    # media_container = MediaContainer.create!(title: media_title, author: media_author, source: media_source, creation_date: media_creation_date, media: media_file)
    media_container = MediaContainer.create!(title: article_title, media: media_file)

    # article_picture = ArticlePicture.create!(article_id: article.id, media_container_id: media_container.id, for_card: picture_for_card, for_carousel: picture_for_carousel)
    article_picture = ArticlePicture.create!(article_id: article.id, media_container_id: media_container.id, for_card: "true")
  end
end
