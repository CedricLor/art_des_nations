require 'test_helper'

class ArticlesControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "should get index and provide a feed global variable" do
    get :index
    assert_response :success
    assert_not_nil assigns(:feed)
  end

  test "should create article from React and render json index of the corresponding article" do
    assert_difference('Article.count') do
      post :create, article: {title: 'Some title', teaser: 'Some teaser', posted_at: "2015-06-06T00:00", status: 'draft'}
    end

    assert_response(:success)
  end

  test "should create article from Rails and redirect to the articles path" do
    assert_difference('Article.count') do
      post :create, article_form: {article_title: 'Some title', article_teaser: 'Some teaser', article_posted_at: "2015-06-06T00:00", article_status: 'draft'}
    end

    assert_redirected_to articles_path
  end

end
