class Categorizing < ActiveRecord::Base
  default_scope { order(id: :asc) }

  belongs_to :category, inverse_of: :categorizings
  belongs_to :categorizing, :polymorphic => true

end
