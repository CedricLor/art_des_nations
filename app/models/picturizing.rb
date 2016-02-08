class Picturizing < ActiveRecord::Base
  default_scope { order(id: :asc) }

  # belongs_to :article, inverse_of: :picturizings
  belongs_to :media_container, inverse_of: :picturizings
  belongs_to :picturizing, :polymorphic => true

  translates :for_card, :for_carousel, :fallbacks_for_empty_translations => true
end
