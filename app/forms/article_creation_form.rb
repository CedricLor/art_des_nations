class ArticleCreationForm < ArticleForm


  delegate :body, :title, :teaser, :posted_from_location, :posted_at, :status, :author_id, :picturizings, :categorizings, to: :article
  delegate :full_name, to: :author

  # attr_accessor :title, :teaser, :posted_at, :status, :media_file
  # attr_reader :article
  attr_accessor :author_name, :md_for_carousel, :for_card, :new_md,
    :applicable_existing_categories, :main_category_id, :new_category_name

  def article
    @article ||= Article.new
  end

  def author
    @author ||= Author.new
  end

  def submit(params)
    set_attributes(params)
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
    @author = Author.find_or_create_by(full_name: author_name)
    @article.author_id = @author.id
    @article.save!
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
    super
  end
end

      # media_container = MediaContainer.create!(title: media_title, \
      # author: media_author, source: media_source,\
      # creation_date: media_creation_date, media: media_file)

      # article_picture = ArticlePicture.create!(article_id: article.id,\
      # media_container_id: media_container.id,\
      # for_card: picture_for_card, for_carousel: picture_for_carousel)
