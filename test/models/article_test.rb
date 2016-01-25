require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should not save article without title and teaser" do
    article = Article.new(posted_at: "2015-06-06T00:00")
    assert_not article.save, "Saved the article without a title and a teaser"
  end

  test "should not save article without title" do
    article = Article.new(teaser: "Toto")
    assert_not article.save, "Saved the article without a title"
  end

  test "should not save article without teaser" do
    article = Article.new(title: "Titi")
    assert_not article.save, "Saved the article without a teaser"
  end

  test "should not save article without status" do
    article = Article.new(posted_at: "2015-06-06T00:00", teaser: "Toto", title: "Titi")
    assert_not article.save, "Saved the article without a status"
  end

  test "should save article with title, teaser, status and date" do
    article = Article.new(posted_at: "2015-06-06T00:00", teaser: "Toto", title: "Titi", status: "draft")
    assert article.save, "Did not save the article with title, teaser, status and date"
  end
end
