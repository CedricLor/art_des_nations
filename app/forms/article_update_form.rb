class ArticleUpdateForm
  include ActiveModel::Model

  attr_accessor :id, :body, :title, :teaser, :posted_at, :status, :article_picture_ids, :article_pictures, :media_containers, :pictures_marked_for_deletion, :media_files
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
    @article = Article.find(@id)
    @article.update(
      title: title,
      teaser: teaser,
      body: body,
      posted_at: posted_at,
      status: status
    )

    if media_containers
      MediaContainersUpdateForm.new(media_containers_data: media_containers).
         update
    end

    if pictures_marked_for_deletion && pictures_marked_for_deletion.size >= 1
      art_pics_destroy_obj = ArticlePicturesDestroy.new({ids: pictures_marked_for_deletion})
      art_pics_destroy_obj.destroy
    end

    if media_files
      MediaContainersCreationForm.new(
        media_files: media_files,
        article_pictures: article_pictures,
        article_title: title,
        article_id: id
      ).save
    end # End if media_files
  end # End persist!
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


