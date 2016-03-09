require 'test_helper'

class MediaContainersCreationFormTest < ActiveSupport::TestCase
  test "media_containers_creation_form should englobe an existing article upon creation" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Article", picturizable_id: Article.first.id)
    assert_instance_of(Article, @media_containers_creation_form.parent, "MediaContainersCreationFrom does not englobe an instance of Article")
  end

  test "media_containers_creation_form should create 10 media_containers associated with an existing article upon creation" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Article", picturizable_id: Article.first.id)
    i = 0
    @media_containers_creation_form.parent.picturizings.each { |p| i = i + 1 if p.media_container.class.name == "MediaContainer" }
    assert_equal(10, i, "MediaContainersCreationFrom does not contain three instance of media_container")
  end

  test "media_containers_creation_form should englobe instances of media_containers upon creation" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Article", picturizable_id: Article.first.id)
    assert_instance_of(MediaContainer, @media_containers_creation_form.parent.picturizings.first.media_container)
  end

  test "media_containers_creation_form should englobe three EMPTY media_containers upon creation" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Article", picturizable_id: Article.first.id)
    assert_equal(nil, @media_containers_creation_form.parent.picturizings.first.media_container.id)
  end

  test "media_containers_creation_form should create 10 picturizings associated with an existing article upon creation" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Article", picturizable_id: Article.first.id)
    assert_equal(10, @media_containers_creation_form.parent.picturizings.size, "MediaContainersCreationFrom does not contain 10 instance of picturizing")
  end

  test "media_containers_creation_form should englobe instances of picturizings upon creation" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Article", picturizable_id: Article.first.id)
    assert_instance_of(Picturizing, @media_containers_creation_form.parent.picturizings.first)
  end

  test "media_containers_creation_form should englobe three EMPTY picturizings upon creation" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Article", picturizable_id: Article.first.id)
    assert_equal(@media_containers_creation_form.parent.picturizings.first.id, nil)
  end

  test "media_containers_creation_form should create only one picturizing if picturizable_type is of type Portrait" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Portrait", picturizable_id: Portrait.first.id)
    assert_equal(1, @media_containers_creation_form.parent.picturizings.size, "MediaContainersCreationFrom contains #{@media_containers_creation_form.parent.picturizings.size} instances of picturizings instead of only one.")
  end

  test "media_containers_creation_form new picturizing should be set for_carousel" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Portrait", picturizable_id: Portrait.first.id)
    assert_equal('true', @media_containers_creation_form.parent.picturizings.first.for_carousel)
  end

  test "media_containers_creation_form new media_container title should be set to an empty string" do
    @media_containers_creation_form = MediaContainersCreationForm.new(picturizable_type: "Portrait", picturizable_id: Portrait.first.id)
    assert_equal('', @media_containers_creation_form.parent.picturizings.first.media_container.title)
  end
end
