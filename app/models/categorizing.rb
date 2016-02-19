class Categorizing < ActiveRecord::Base

  validates :category_id, presence: true
  validates :category_id, numericality: true

  validates :categorizable_id, presence: true
  validates :categorizable_id, numericality: true
  # validates :categorizable_id, inclusion: { in: Category.all.map { |cat| cat.id },
  #   message: "%{value} is not a valid category" }

  validates :categorizable_type, presence: true
  validates :categorizable_type, inclusion: { in: %w(Aktion Article Portrait),
    message: "%{value} is not a valid association with an article. Choose between Article, Aktion and Portrait." }

  default_scope { order(id: :asc) }

  belongs_to :category, inverse_of: :categorizings
  belongs_to :categorizable, :polymorphic => true
  belongs_to :article, inverse_of: :categorizings
  belongs_to :aktion, inverse_of: :categorizings
  belongs_to :portrait, inverse_of: :categorizings

end

# class CreateCategorizings < ActiveRecord::Migration
#   def up
#     create_table :categorizings do |t|
#       t.integer :category_id, :null => false
#       t.integer :categorizable_id, :null => false
#       t.string  :categorizable_type, :null => false, :limit => 20
#     end

#     add_index :categorizings, :category_id
#     add_index :categorizings, [:categorizable_id, :categorizable_type], name: :index_categorizings_on_categorizable_id_and_type

#   end

#   def down
#     drop_table :categorizings
#   end
# end
