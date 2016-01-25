class ArticleSerializerTest < Minitest::Test

  def setup
    @serializer = ArticleSerializer.new Article.new(id: 123, title: 'some title', body: 'some text', teaser: 'some teaser', posted_at: '2016-01-01T00:00', status: 'draft')
  end

  def test_json_returned_for_single_article_serializing_with_embedded_empty_media_containers_in_root
    assert_equal '{"article":{"id":123,"body":"some text","posted_at":"2016-01-01T00:00:00.000Z","status":"draft","teaser":"some teaser","title":"some title","media_container_ids":[]},"media_containers":[]}', @serializer.to_json
  end
end
