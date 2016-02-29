class AktionCreationForm < AktionForm


  delegate :body, :title, :teaser, :posted_at, :aktion_date, :status, :country_id, :country, :picturizings, :categorizings, to: :aktion


  attr_accessor :md_for_carousel, :for_card, :new_md,
    :applicable_existing_categories, :main_category_id, :new_category_name

  def aktion
    @main_model ||= Aktion.new
  end

  private

  def persist_ancillary_data
    create_pictures(@main_model.id, @main_model.class.name, new_md, for_card)
    super
  end
end
