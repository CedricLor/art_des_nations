class ArticleLinking < ActiveRecord::Base
  default_scope { order(id: :asc) }

  belongs_to :article, inverse_of: :article_linkings
  belongs_to :article_linking, :polymorphic => true
end
