require 'test_helper'

class PortraitIntrosControllerTest < ActionController::TestCase
  setup do
    @portrait_intro = portrait_intros(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:portrait_intros)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create portrait_intro" do
    assert_difference('PortraitIntro.count') do
      post :create, portrait_intro: {  }
    end

    assert_redirected_to portrait_intro_path(assigns(:portrait_intro))
  end

  test "should show portrait_intro" do
    get :show, id: @portrait_intro
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @portrait_intro
    assert_response :success
  end

  test "should update portrait_intro" do
    patch :update, id: @portrait_intro, portrait_intro: {  }
    assert_redirected_to portrait_intro_path(assigns(:portrait_intro))
  end

  test "should destroy portrait_intro" do
    assert_difference('PortraitIntro.count', -1) do
      delete :destroy, id: @portrait_intro
    end

    assert_redirected_to portrait_intros_path
  end
end
