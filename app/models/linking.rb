class Linking < ActiveRecord::Base
  belongs_to :from_linkable, :polymorphic => true
  belongs_to :to_linkable, :polymorphic => true

  belongs_to :to_aktion, inverse_of: :linkings, class_name: "Aktion"
  belongs_to :from_aktion, inverse_of: :linkings, class_name: "Aktion"

  belongs_to :to_portrait, inverse_of: :linkings, class_name: "Portrait"
  belongs_to :from_portrait, inverse_of: :linkings, class_name: "Portrait"

  belongs_to :to_article, inverse_of: :linkings, class_name: "Article"
  belongs_to :from_article, inverse_of: :linkings, class_name: "Article"
end
