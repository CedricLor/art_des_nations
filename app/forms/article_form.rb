class ArticleForm
  include ActiveModel::Model

  attr_accessor :article_title, :article_teaser, :article_body, :gallery_title, :media_title, :media_author, :media_source, :media_creation_date, :media_file

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
    @article = Article.create!(title: article_title, teaser: article_teaser, body: article_body)
    @gallery = @article.galleries.create!(title: gallery_title)
    @media_container = @gallery.media_containers.create!(title: media_title, author: media_author, source: media_source, creation_date: media_creation_date, media: media_file)
  end
end
