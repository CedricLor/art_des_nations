# lib/my_modules/aktion_article_form_setters.rb

module AktionArticleFormSetters
  def set_common_update_attributes
    self.for_card ||= populate_for_card

    self.md_for_carousel ||= @main_model.picturizings.
        map{ |p| {p.id.to_s => p.for_carousel} }.
        reduce(Hash.new, :merge)
    self.md_to_update ||= @main_model.picturizings.
        map{ |p| {p.id.to_s => p.media_container.title} }.
        reduce(Hash.new, :merge)
    self.md_for_destruction ||= nil

    self.main_category_id ||= @main_model.categorizings.first.category_id.to_s
  end

  private

  def populate_for_card
    return '' unless picture_for_card = @main_model.
      picturizings.
      select{ |p| p.for_card == "true" }.
      last
    "existing_md_".concat(picture_for_card.id)
  end
end
