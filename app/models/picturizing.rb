class Picturizing < ActiveRecord::Base
  default_scope { order(id: :asc) }

  validates :media_container_id, presence: true
  validates :media_container_id, numericality: true

  validates :picturizable_id, presence: true
  validates :picturizable_id, numericality: true

  validates :picturizable_type, presence: true
  validates :picturizable_type, inclusion: { in: %w(Action Article Portrait),
    message: "%{value} is not a valid association for a picture. Choose between Article, Action and Portrait." }

  validates :for_card, presence: true
  validates :for_card, inclusion: { in: %w(true false)}

  validates :for_carousel, presence: true
  validates :for_carousel, inclusion: { in: %w(true false)}


  # belongs_to :article, inverse_of: :picturizings
  belongs_to :media_container, inverse_of: :picturizings
  belongs_to :picturizable, :polymorphic => true

  translates :for_card, :for_carousel, :fallbacks_for_empty_translations => true
end