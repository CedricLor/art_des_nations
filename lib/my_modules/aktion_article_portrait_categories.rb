# lib/my_modules/aktion_article_portrait_categories.rb

module AktionArticlePortraitCategories
  def persist_category_changes(item, item_type, applicable_existing_categories, main_category_id, new_category_name, new_category_is_main_category)

    clean_up_categories(item)

    if new_category_name && new_category_is_main_category == "true"
      save_and_apply_new_category(item.id, item_type, new_category_name)
    else
      create_categorizing(item.id, item_type, main_category_id)
      save_and_apply_new_category(item.id, item_type, new_category_name)
    end

    if applicable_existing_categories
      save_applicable_existing_categories(item.id, item_type, applicable_existing_categories)
    end
  end

  private

  def clean_up_categories(item)
    item.categorizings.clear
  end

  def save_and_apply_new_category(item_id, item_type, new_category_name)
    kategory = Category.create(
      name: new_category_name
    )
    create_categorizing(item_id, item_type, kategory.id)
  end

  def create_categorizing(item_id, item_type, main_category_id)
    Categorizing.create(
      categorizable_id: item_id,
      categorizable_type: item_type,
      category_id: main_category_id
    )
  end

  def save_applicable_existing_categories(item_id, item_type, applicable_existing_categories)
    applicable_existing_categories.each do | k, v |
      create_categorizing(item_id, item_type, k) if v == "true"
    end
  end
end
