module AktionArticleFormHelper

  def mark_as_checked_if_pict_is_for_card(parent, pict)
    checked = ''
    if parent.for_card
      parent.for_card.match(/(existing_md_|new_md_)(\d+)/) do |match|
        checked = 'checked' if match[2] == pict.id.to_s
      end
    else
      checked = 'checked' if pict.respond_to?(:for_card) && pict.for_card == "true"
    end
    checked
  end

  def marked_for_destruction(parent)
    (defined? parent.md_for_destruction) && parent.md_for_destruction ?
    parent.md_for_destruction.map{ |k,v| k.to_i } :
    []
  end

  def mark_as_checked_if_pict_is_marked_for_destruction(marked_for_destruction, pict)
    marked_for_destruction.include?(pict.id) ? 'checked' : ''
  end

  def marked_for_carousel(parent, pict)
    checked_yes = ''
    checked_no = ''
    if parent.md_for_carousel
      parent.md_for_carousel[pict.id.to_s] == 'true' ?
      checked_yes = 'checked' :
      checked_no = 'checked'
    else
      pict.for_carousel == "true" ?
      checked_yes = 'checked' :
      checked_no = 'checked'
    end
    return checked_yes, checked_no
  end

  def title_for_existing_md(parent, pict)
    parent.md_to_update ?
    parent.md_to_update[pict.id.to_s] :
    pict.media_container.title
  end

  def marked_as_chosen_category(parent, formerly_chosen_category_ids, current_category)
    checked_yes = ''
    checked_no = ''
    if parent.applicable_existing_categories.present?
      parent.applicable_existing_categories[current_category.id.to_s] == 'true' ?
      checked_yes = 'checked' :
      checked_no = 'checked'
    else
      formerly_chosen_category_ids.include?(current_category.id) ?
      checked_yes = 'checked' :
      checked_no = 'checked'
    end
    return checked_yes, checked_no
  end

  def is_main_category?(parent, chosen_category_ids, kateg)
    if parent.main_category_id
      "checked" if parent.main_category_id == kateg.id.to_s
    else
      "checked" if kateg.id == chosen_category_ids.first
    end
  end
end
