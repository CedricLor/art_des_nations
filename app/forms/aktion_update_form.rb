class AktionUpdateForm < AktionForm
  include AktionArticleFormSetters

  delegate :body, :body=,
  :title, :title=,
  :teaser, :teaser=,
  :posted_at, :posted_at=,
  :aktion_date, :aktion_date=,
  :status, :status=,
  :country_id, :country_id=,
  :country,
  :picturizings,
  :categorizings,
  to: :aktion


  attr_accessor :id,
    :new_md, :for_card, :md_for_carousel, :md_to_update, :md_for_destruction,
    :applicable_existing_categories, :main_category_id, :new_category_name

  def aktion
    @main_model ||= Aktion.includes(:country).
      includes(picturizings: [:translations, media_container: :translations]).
      includes(categorizings: [category: :translations]).
      find(@id)
  end

  private

  def set_attributes(params)
    super
    set_common_update_attributes
  end

  def persist_ancillary_data
    persist_picture_changes
    super
  end
end
