class AktionUpdateForm < AktionForm

  delegate :body, :title, :teaser, :posted_at, :aktion_date, :status, :country_id, :country, :picturizings, :categorizings, to: :aktion


  attr_accessor :id, :md_for_destruction, :md_for_carousel, :for_card, :new_md, :md_to_update,
    :applicable_existing_categories, :main_category_id, :new_category_name

  def initialize(attributes={})
    super
    aktion
  end

  def aktion
    @main_model ||= Aktion.includes(:media_containers, :country).
      includes(categorizings: [category: :translations]).
      find(@id)
  end

  private

  def set_attributes(params)
    super
    self.md_for_destruction = params[:md_for_destruction]
    self.md_to_update = params[:md_to_update]
    self.md_for_carousel = params[:md_for_carousel]
  end

  def persist_ancillary_data
    persist_picture_changes(
      @main_model,
      @main_model.class.name,
      md_to_update,
      md_for_carousel,
      new_md,
      for_card,
      md_for_destruction
    )
    super
  end
end
