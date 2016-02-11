class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :authenticate_user!

  protect_from_forgery with: :exception

  before_action :set_locale
  before_action :set_categories_for_side_nav
  before_action :set_remaining_locales_for_language_switcher

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale == I18n.default_locale ? nil : I18n.locale }
  end

  def set_categories_for_side_nav
    @categories_for_side_nav = Category.all
  end

  def set_remaining_locales_for_language_switcher
    language_array = [{fr: "FR"}, {en: "EN"}, {ru: "PY"}, {:"zh-CN" => "中文"}]
    @remaining_locales = language_array.select do |available_locale|
      available_locale unless available_locale.keys[0] == I18n.locale
    end
  end
end
