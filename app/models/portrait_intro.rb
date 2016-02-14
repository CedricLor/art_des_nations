class PortraitIntro < ActiveRecord::Base
  validates :intro, presence: true

  translates :intro, :fallbacks_for_empty_translations => true
end
