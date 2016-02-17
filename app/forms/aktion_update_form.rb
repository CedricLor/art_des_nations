class AktionUpdateForm
  include ActiveModel::Model
  include AktionArticlePictures

  attr_accessor :id, :body, :title, :teaser, :posted_at, :aktion_date,:status, :country_id, :md_for_destruction, :md_for_carousel, :for_card, :new_md, :md_to_update
  attr_reader :aktion

  def update
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
    @aktion = Aktion.includes(:media_containers, :country).find(@id)

    @aktion.update(
      title: title,
      teaser: teaser,
      body: body,
      posted_at: posted_at,
      aktion_date: aktion_date,
      status: status,
      country_id: country_id
    )

    persist_ancillary_data
  end # End persist!

  def persist_ancillary_data
    persist_picture_changes(
      @aktion,
      "Aktion",
      md_to_update,
      md_for_carousel,
      new_md, for_card,
      md_for_destruction
    )
  end
end
