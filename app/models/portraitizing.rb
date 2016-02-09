class Portraitizing < ActiveRecord::Base
  default_scope { order(id: :asc) }

  belongs_to :portrait, inverse_of: :portraitizings
  belongs_to :portraitizable, :polymorphic => true

end
