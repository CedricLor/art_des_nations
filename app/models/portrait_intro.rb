class PortraitIntro < ActiveRecord::Base
  validates :intro, presence: true

  translates :intro, :fallbacks_for_empty_translations => true

  def title
    I18n.t(:portrait_intro_title, default: "Page d'accueil des profils des artistes d'Art des Nations")
  end

  def teaser
    self.intro
  end

  def picturizings
    nil
  end
end
