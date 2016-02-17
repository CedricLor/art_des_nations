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
    if md_to_update
      update_pictures(@aktion, md_to_update, md_for_carousel)
    end

    if new_md
      create_pictures(@aktion.id, 'Aktion', new_md, for_card)
    end

    if for_card && for_card.match(/existing_md_/)
      pict_id = for_card.sub(/existing_md_/, '')
      update_pictures_for_card(@aktion, pict_id)
    end

    if md_for_destruction
      destroy_pictures(@aktion, md_for_destruction)
    end
  end
end
