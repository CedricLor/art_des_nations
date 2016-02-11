class ArticleLinking < ActiveRecord::Base
  validates :article_id, presence: true
  validates :article_id, numericality: true

  validates :article_linkable_id, presence: true
  validates :article_linkable_id, numericality: true
  # validates :categorizable_id, inclusion: { in: Category.all.map { |cat| cat.id },
  #   message: "%{value} is not a valid category" }

  validates :article_linkable_type, presence: true
  validates :article_linkable_type, inclusion: { in: %w(Aktion Article Portrait),
    message: "%{value} is not a valid association with an article. Choose between Article, Aktion and Portrait." }

  default_scope { order(id: :asc) }

  belongs_to :article, inverse_of: :article_linkings
  belongs_to :article_linkable, :polymorphic => true
end

# class CreateArticleLinkings < ActiveRecord::Migration
#   def up
#     create_table :article_linkings do |t|
#       t.integer :article_id, :null => false
#       t.integer :article_linkable_id, :null => false
#       t.string  :article_linkable_type, :null => false
#     end

#     add_index :article_linkings, :article_id
#     add_index :article_linkings, [:article_linkable_id, :article_linkable_type], name: :index_article_linkings_on_linkable_id_and_type

#   end

#   def down
#     drop_table :article_linkings
#   end
# end
