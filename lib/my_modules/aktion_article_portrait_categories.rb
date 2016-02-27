# lib/my_modules/aktion_article_portrait_categories.rb

module AktionArticlePortraitCategories
  def persist_categories(item, item_type, applicable_existing_categories, main_category_id, new_category_name)

    clean_up_categories(item)

    # if main_category_id is equal to the new category AND new_category_name exist
    if main_category_id == "new_category" && new_category_name.present?
      # save the new category first to make it main category
      save_and_apply_new_category(
        new_category_name,
        item.id,
        item_type
      )
    else # if main_category_id is not equal to the new category OR new_category_name has not been set
      # A. if the main_category_id is equal to something (other than new_category):
      if main_category_id.present?
        # 1. create the main category first
        create_categorizing(
          item.id,
          item_type,
          main_category_id
        )
        # 2. extract the first category id from the existing categories array to avoid duplication
        applicable_existing_categories.except!(main_category_id)
      end
      # B. if the new_category_name has been set to something (but is not main_category), create the new category
      save_and_apply_new_category(
        new_category_name,
        item.id,
        item_type) if new_category_name.present?
    end

    # in all cases, save all the existing categories (except, as the case may be, the main category which has already been saved)
    save_applicable_existing_categories(
      item.id,
      item_type,
      applicable_existing_categories
    )
  end

  private

  def clean_up_categories(item)
    item.categorizings.clear
  end

  def save_and_apply_new_category(new_category_name, item_id, item_type)
    kategory = Category.create(
      name: new_category_name
    )
    create_categorizing(
      item_id,
      item_type,
      kategory.id
    )
  end

  def create_categorizing(item_id, item_type, category_id)
    Categorizing.create(
      categorizable_id: item_id,
      categorizable_type: item_type,
      category_id: category_id
    )
  end

  def save_applicable_existing_categories(item_id, item_type, applicable_existing_categories)
    applicable_existing_categories.each do | k, v |
      create_categorizing(item_id, item_type, k) if v == "true"
    end
  end
end
