require 'test_helper'

class AktionsControllerTest < ActionController::TestCase
  setup do
    @aktion = aktions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:aktions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create aktion" do
    assert_difference('Aktion.count') do
      post :create, aktion: {  }
    end

    assert_redirected_to aktion_path(assigns(:aktion))
  end

  test "should show aktion" do
    get :show, id: @aktion
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @aktion
    assert_response :success
  end

  test "should update aktion" do
    patch :update, id: @aktion, aktion: {  }
    assert_redirected_to aktion_path(assigns(:aktion))
  end

  test "should destroy aktion" do
    assert_difference('Aktion.count', -1) do
      delete :destroy, id: @aktion
    end

    assert_redirected_to aktions_path
  end
end
