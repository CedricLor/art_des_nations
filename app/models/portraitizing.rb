class Portraitizing < ActiveRecord::Base
  validates :portrait_id, presence: true
  validates :portrait_id, numericality: true

  validates :portraitizable_id, presence: true
  validates :portraitizable_id, numericality: true
  # validates :categorizable_id, inclusion: { in: Category.all.map { |cat| cat.id },
  #   message: "%{value} is not a valid category" }

  validates :portraitizable_type, presence: true
  validates :portraitizable_type, inclusion: { in: %w(Aktion Article),
    message: "%{value} is not a valid association with a portrait. Choose between Article and Aktion." }

  default_scope { order(id: :asc) }

  belongs_to :portrait, inverse_of: :portraitizings
  belongs_to :portraitizable, :polymorphic => true

end
