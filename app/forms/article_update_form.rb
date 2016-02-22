class ArticleUpdateForm
  include ActiveModel::Model
  include AktionArticlePictures
  include AktionArticlePortraitCategories

  attr_accessor :id, :body, :title, :teaser, :posted_from_location, :posted_at, :status, :md_for_destruction, :md_for_carousel, :for_card, :new_md, :md_to_update, :author_id, :create_new_author, :applicable_existing_categories, :main_category_id, :new_category_name
  attr_reader :article

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
    @article = Article.includes(:media_containers, :author).find(@id)

    @article.update(
      title: title,
      teaser: teaser,
      body: body,
      posted_from_location: posted_from_location,
      posted_at: posted_at,
      status: status
    )

    persist_ancillary_data
  end # End persist!

  def persist_ancillary_data
    persist_picture_changes(
      @article,
      "Article",
      md_to_update,
      md_for_carousel,
      new_md, for_card,
      md_for_destruction
    )

    persist_category_changes(
      @article,
      "Article",
      applicable_existing_categories,
      main_category_id,
      new_category_name
    )

    handle_author_name
  end

  def handle_author_name
    # FIXME -- We need some kind of validation rule before executing this
    # if nothing has changed, return true
    return true if @article.author.full_name == create_new_author && @article.author_id.to_s == author_id
    # else if the user has entered a new name in the input field, create author and assign it the article
    # if the user has both changed the author from the list and entered a new name in the field,
    # we skip the registration of another author from the list
    return create_author_and_assign_article if create_new_author.present?
    # else if the user has selected a different author in the list, update the article and return
    return @article.update(author_id: author_id) if @article.author_id.to_s != author_id
  end

  def create_author_and_assign_article
    author = Author.create(full_name: create_new_author)
    @article.update(author_id: author.id)
  end
end # End class

# It should receive five type of data:
# 1. direct article data
# 2. article_pictures
# 3. media_containers
# 4. article_picture_ids array and media_container_ids array marked for deletion
# 5. an article_pictures_ids and a media_containers_ids array marked for addition
# 6. new pictures

# It should:
# 1. update the article (need to parse the incoming params string to select article fields only)
# 2. delete any media_container and article_picture marked for deletion
# 3. create any media_container and article_picture marked for addition
# 4. update the article_pictures
# 5. update the media_containers

# {
#   "article"=>"{\"id\":49,\"body\":null,\"posted_at\":\"2016-01-31T19:34:35.574Z\",\"status\":\"draft\",\"teaser\":\"Test\",\"title\":\"Test\",\"article_picture_ids\":[129]}",
#   "article_pictures"=>"[{\"for_card\":\"false\",\"for_carousel\":\"true\",\"id\":129,\"stored_file_id\":1}]",
#   "media_containers"=>"[]",
#   "media_file_1"=>'#<ActionDispatch::Http::UploadedFile:0x007fd09b7c6050 @tempfile=#<Tempfile:/var/folders/2b/34sqn8dj6_j2bwzf371n7kfm0000gn/T/RackMultipart20160204-3009-a8oapp.jpg>, @original_filename="great-wall-of-china.jpg", @content_type="image/jpeg", @headers="Content-Disposition: form-data; name=\"media_file_1\"; filename=\"great-wall-of-china.jpg\"\r\nContent-Type: image/jpeg\r\n">',
#   "pictures_marked_for_deletion"=>"{\"articlePictures\":[29]}",
#   "locale"=>"fr",
#   "id"=>"49"
# }


