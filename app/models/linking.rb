# This is the internal linking class
class Linking < ActiveRecord::Base

  validates :from_linkable_id, presence: true
  validates :from_linkable_id, numericality: { only_integer: true }

  validates :from_linkable_type, presence: true
  validates :from_linkable_type, inclusion: { in: %w(Article Aktion Portrait),
    message: "A link may only be inserted into an Article, an Aktion or a Portrait. %{value} is not a valid source (from_linkable_type) for a link." }

  validates :to_linkable_id, presence: true
  validates :to_linkable_id, numericality: { only_integer: true }

  validates :to_linkable_type, presence: true
  validates :to_linkable_type, inclusion: { in: %w(Article Aktion Portrait),
    message: "A link may only lead to an Article, an Aktion or a Portrait. %{value} is not a valid destination (to_linkable_type) for a link." }

  belongs_to :from_linkable, :polymorphic => true
  belongs_to :to_linkable, :polymorphic => true

  belongs_to :to_aktion, inverse_of: :linkings, class_name: "Aktion"
  belongs_to :from_aktion, inverse_of: :linkings, class_name: "Aktion"

  belongs_to :to_portrait, inverse_of: :linkings, class_name: "Portrait"
  belongs_to :from_portrait, inverse_of: :linkings, class_name: "Portrait"

  belongs_to :to_article, inverse_of: :linkings, class_name: "Article"
  belongs_to :from_article, inverse_of: :linkings, class_name: "Article"

  delegate :picturizings, :categorizings, to: :target_element

  def self.from(type, id)
    includes(to_linkable: [:translations, {categorizings: [category: :translations]}]).
    where(from_linkable_id: id, from_linkable_type: type)
  end

  def self.to(type, id)
    includes(from_linkable: [:translations, {categorizings: [category: :translations]}]).
    where(to_linkable_id: id, to_linkable_type: type)
  end

  def self.for(type, id)
    from_linkings = from(type, id).each { |linking| linking.set_caller_side = "from" }
    to_linkings = to(type, id).each { |linking| linking.set_caller_side = "to" }
    from_linkings + to_linkings
  end

  def target_element
    if @caller_side == "from"
      from_linkable
    else
      to_linkable
    end
  end

  def caller_id
    if @caller_side == "from"
      from_linkable_id
    else
      to_linkable_id
    end
  end

  def caller_type
    if @caller_side == "from"
      from_linkable_type
    else
      to_linkable_type
    end
  end

  def set_caller_side=(val)
    @caller_side
  end

  def get_caller_side
    @caller_side
  end
end
