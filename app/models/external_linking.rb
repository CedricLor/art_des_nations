class ExternalLinking < ActiveRecord::Base
  default_scope { order(id: :asc) }

  belongs_to :external_link, inverse_of: :external_linkings
  belongs_to :external_linking, :polymorphic => true
end
