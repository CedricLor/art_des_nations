class PortraitIntro < ActiveRecord::Base
  translates :intro, :fallbacks_for_empty_translations => true
end
