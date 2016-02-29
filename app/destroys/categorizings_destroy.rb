class CategorizingsDestroy

  def self.destroy_with_content(categorizable_id, categorizable_type)
    @categorizings_to_destroy = Categorizing.where(
      categorizable_id: categorizable_id,
      categorizable_type: categorizable_type
    )
    destroy_categorizings
  end

  def self.destroy_with_category(category_id)
    @categorizings_to_destroy = Categorizing.where(
      category_id: category_id
    )
    destroy_categorizings
  end

  private

  def self.destroy_categorizings
    @categorizings_to_destroy.each do |categorizing|
      categorizing.destroy
    end
  end
end
