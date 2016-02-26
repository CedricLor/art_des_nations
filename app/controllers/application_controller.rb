class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :authenticate_user!

  protect_from_forgery with: :exception

  before_action :set_locale
  before_action :set_categories
  before_action :set_countries_for_side_nav
  before_action :set_locales_for_language_switcher
  before_action :set_static_pages

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale == I18n.default_locale ? nil : I18n.locale }
  end

  def set_categories
    @categories = Category.includes(:translations)
  end

  def set_countries_for_side_nav
    @countries = Country.includes(:translations)
  end

  def set_locales_for_language_switcher
    @languages_array = [{fr: "FR"}, {en: "EN"}, {ru: "PY"}, {:"zh-CN" => "中文"}]
  end

  def set_static_pages
    @static_pages = Hash[StaticPage.all.
      map {|elt| [elt.id, elt] }
    ]
  end
end
