class HomePage < ActiveRecord::Base
  has_many :external_linkings, :as => :external_linkable, inverse_of: :home_page
  has_many :external_links, through: :external_linkings
  has_many :site_editorials, inverse_of: :home_page

  translates :call_to_action, :fallbacks_for_empty_translations => true

  def site_editorial
    site_editorials.
      where(status: 'featured').
      last
  end

  def editorial
    site_editorial.body
  end

  def editorial_id
    site_editorial.id
  end

  def editorial=(value)
    site_editorials.
      where(status: 'featured').
      last.
      update!(
      body: value
    )
  end

  def short_editorial
    end_of_short_edito = editorial.length > 350 ? (editorial.index('</p>', 350) + 4) : editorial.length
    editorial.slice(0, end_of_short_edito)
  end

  def teaser
    short_editorial
  end

  def title
    I18n.t(:home_page_title, default: "Page d'accueil de l'Art des Nations")
  end

  def picturizings
    nil
  end
end

