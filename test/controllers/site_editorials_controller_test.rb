require 'test_helper'

class SiteEditorialsControllerTest < ActionController::TestCase
  setup do
    @site_editorial = site_editorials(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:site_editorials)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create site_editorial" do
    assert_difference('SiteEditorial.count') do
      post :create, site_editorial: {  }
    end

    assert_redirected_to site_editorial_path(assigns(:site_editorial))
  end

  test "should show site_editorial" do
    get :show, id: @site_editorial
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @site_editorial
    assert_response :success
  end

  test "should update site_editorial" do
    patch :update, id: @site_editorial, site_editorial: {  }
    assert_redirected_to site_editorial_path(assigns(:site_editorial))
  end

  test "should destroy site_editorial" do
    assert_difference('SiteEditorial.count', -1) do
      delete :destroy, id: @site_editorial
    end

    assert_redirected_to site_editorials_path
  end
end
