class ArticleUpdateForm
  include ActiveModel::Model

  attr_accessor :id, :body, :title, :teaser, :posted_from_location, :posted_at, :status, :md_for_destruction, :md_for_carousel, :for_card, :new_md, :md_to_update, :author_id, :create_new_author
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
    if md_to_update
      update_pictures
    end
    byebug
    if md_for_carousel
      update_pictures_for_carousel
    end

    if new_md
      create_pictures
    end

    if pict_id = for_card.sub(/existing_md_/, '')
      update_pictures_for_card(pict_id)
    end

    if md_for_destruction
      destroy_pictures
    end

    handle_author_name
  end

  def update_pictures
    @article.picturizings.each do |pict|
      pict.media_container.update(
        title: md_to_update["#{pict.id}"]
      )
    end
  end

  def update_pictures_for_carousel
    byebug
    pics_ids = @article.picturizings.
      select{|p| md_for_carousel.keys.include?(p.id.to_s)}.
      map {|p| p.id}
    Picturizing::Translation.where(picturizing_id: pics_ids).update_all(for_carousel: "true")
  end

  def update_pictures_for_card(pict_id)
    Picturizing::Translation.where(picturizing_id: @article.picturizings.ids).update_all(for_card: "false")
    Picturizing::Translation.where(picturizing_id: pict_id).update_all(for_card: "true")
  end

  def destroy_pictures
    # destroy each picturizings which id has been passed in for destruction
    @article.picturizings.each do | picturizing |
      picturizing.destroy if md_for_destruction.keys.include?(picturizing.id.to_s)
    end
    # if the media_container marked for destruction is not associated with any other picturizing, destroy it
    @article.media_containers.each do |md|
      md.destroy if md.picturizings.size == 0
    end
  end

  def create_pictures
    new_md.each do |md|
      unless md[1]["file"].nil?
        new_md = MediaContainer.create(
          title: md[1]["title"],
          media: md[1]["file"]
        )
        new_md.picturizings.create(
          picturizable_id: @id,
          picturizable_type: "Article",
          for_carousel: md[1]["for_carousel"] || "true",
          for_card: new_pic_is_for_card || "false"
        )
      end
    end
  end

  def new_pic_is_for_card
    for_card.sub(/new_card_/) != for_card ? false : true
  end

  def handle_author_name
    # FIXME -- We need some kind of validation rule before executing this
    # if nothing has changed, return true
    return true if @article.author.full_name == create_new_author && @article.author_id.to_s == author_id
    # else if the user has selected a different author in the list, update the article and return
    return @article.update(author_id: author_id) if @article.author_id.to_s != author_id
    # else if the user has entered a new name in the input field, create author and assign it the article
    # if he user has both changed the article from the list and entered a new name in the field,
    # we will not register the new author
    create_author_and_assign_article if create_new_author.blank?
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


