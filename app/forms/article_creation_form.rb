class ArticleCreationForm
  include ActiveModel::Model
  include AktionArticlePictures
  include AktionArticlePortraitCategories
  include ArticleForms

  # attr_accessor :title, :teaser, :posted_at, :status, :media_file
  # attr_reader :article
  attr_accessor :id, :body, :title, :teaser, :posted_from_location, :posted_at, :status, :for_card, :new_md, :author_id, :create_new_author, :applicable_existing_categories, :main_category_id, :new_category_name
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
      body: body,
      posted_from_location: posted_from_location,
      posted_at: posted_at,
      status: status
      )

    persist_ancillary_data
  #   return if media_file == 'undefined'
  #   MediaContainerCreationForm.new(
  #     title: title,
  #     media_file: media_file,
  #     article_id: @article.id,
  #     article_picture_is_for_card: 'true',
  #     article_picture_is_for_carousel: 'true'
  #   ).save
  end

  def persist_ancillary_data
    create_pictures(@article.id, "Article", new_md, for_card)

    persist_categories(
      @article,
      "Article",
      applicable_existing_categories,
      main_category_id,
      new_category_name
    )

    handle_author_name
  end
end

      # media_container = MediaContainer.create!(title: media_title, \
      # author: media_author, source: media_source,\
      # creation_date: media_creation_date, media: media_file)

      # article_picture = ArticlePicture.create!(article_id: article.id,\
      # media_container_id: media_container.id,\
      # for_card: picture_for_card, for_carousel: picture_for_carousel)
