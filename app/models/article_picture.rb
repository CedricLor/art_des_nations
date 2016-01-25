class ArticlePicture < ActiveRecord::Base
  belongs_to :article, inverse_of: :article_pictures
  belongs_to :media_container, inverse_of: :article_pictures

  translates :for_card, :for_carousel, :fallbacks_for_empty_translations => true
end
