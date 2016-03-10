require 'test_helper'

class ArticlesControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "should get an admin toolbar on show article" do
    sign_in users(:one)
    get(:show, {'id' => '1', 'user_id' => 1})
    assert_response(:success)
    assert_not_nil assigns(:article)
    assert_select ".admin-nav-wrapper" do
      assert_select "#dropdownMenu1", "Session"
      assert_select "#dropdownMenu2", "Article"
      assert_select "[aria-labelledby='dropdownMenu2']" do
        assert_select "li:first-child > a" do |anchor|
          assert_equal article_path, anchor.attr('href').value
          assert_equal I18n.t(:admin_nav_delete_content, default: 'Delete'), anchor.children.text
        end
        assert_select "li:nth-child(2) > a" do |anchor|
          assert_equal new_article_path, anchor.attr('href').value
          assert_equal I18n.t(:admin_nav_new_content, default: 'New'), anchor.children.text
        end
        assert_select "li:nth-child(3) > a" do |anchor|
          assert_equal edit_article_path(1), anchor.attr('href').value
          assert_equal I18n.t(:admin_nav_edit_content, default: 'Edit'), anchor.children.text
        end
        assert_select "li:nth-child(4) > a" do |anchor|
          assert_equal linkings_for_path("Article", 1), anchor.attr('href').value
          assert_equal I18n.t(:admin_nav_manage_links, default: 'Manage links'), anchor.children.text
        end
        assert_select "li:last-child > a" do |anchor|
          assert_equal articles_path, anchor.attr('href').value
          assert_equal I18n.t(:admin_nav_admin_index_content, default: 'Index'), anchor.children.text
        end
      end
    end
  end

  # test "should create article from React and render json index of the corresponding article" do
  #   assert_difference('Article.count') do
  #     post :create, article: {title: 'Some title', teaser: 'Some teaser', posted_at: "2015-06-06T00:00", status: 'draft'}
  #   end

  #   assert_response(:success)
  # end

  # test "should create article from Rails and redirect to the articles path" do
  #   assert_difference('Article.count') do
  #     post :create, article_form: {article_title: 'Some title', article_teaser: 'Some teaser', article_posted_at: "2015-06-06T00:00", article_status: 'draft'}
  #   end

  #   assert_redirected_to articles_path
  # end

end
