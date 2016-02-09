class ExternalLinking < ActiveRecord::Base
  validates :external_link_id, presence: true
  validates :external_link_id, numericality: true

  validates :external_linkable_id, presence: true
  validates :external_linkable_id, numericality: true

  validates :external_linkable_type, presence: true
  validates :external_linkable_type, inclusion: { in: %w(HomePage Country),
    message: "%{value} is not a valid association with an external link. Choose between HomePage and Country." }


  default_scope { order(id: :asc) }

  belongs_to :external_link, inverse_of: :external_linkings
  belongs_to :external_linkable, :polymorphic => true
end
