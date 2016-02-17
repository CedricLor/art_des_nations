# lib/my_modules/aktion_article.rb

module AktionArticlePictures
  def persist_picture_changes(item, item_type, md_to_update, md_for_carousel, new_md, for_card, md_for_destruction)
    if md_to_update
      update_pictures(item, md_to_update, md_for_carousel)
    end

    if new_md
      create_pictures(item.id, item_type, new_md, for_card)
    end

    if for_card && for_card.match(/existing_md_/)
      pict_id = for_card.sub(/existing_md_/, '')
      update_pictures_for_card(item, pict_id)
    end

    if md_for_destruction
      destroy_pictures(item, md_for_destruction)
    end
  end

  private

  def update_pictures(item, md_to_update, md_for_carousel)
    item.picturizings.each do |pict|
      pict.update(
        for_carousel: md_for_carousel["#{pict.id}"]
      )
      pict.media_container.update(
        title: md_to_update["#{pict.id}"]
      )
    end
  end

  # def update_pictures_for_carousel(item, md_for_carousel)
  #   pics_ids = item.picturizings.
  #     select{|p| md_for_carousel.keys.include?(p.id.to_s)}.
  #     map {|p| p.id}
  #   Picturizing::Translation.where(picturizing_id: pics_ids).update_all(for_carousel: "true")
  # end

  def create_pictures(picturizable_id, picturizable_type, new_mds, for_card)
    new_mds.each do |key,value|
      unless value["file"].nil?
        created_md = MediaContainer.create(
          title: value["title"],
          media: value["file"]
        )
        created_md.picturizings.create(
          picturizable_id: picturizable_id,
          picturizable_type: picturizable_type,
          for_carousel: value["for_carousel"],
          for_card: for_card.sub(/new_md_/, '') == key ? "true" : "false"
        )
      end
    end
  end

  def update_pictures_for_card(item, pict_id)
    Picturizing::Translation.where(picturizing_id: item.picturizings.ids).update_all(for_card: "false")
    Picturizing::Translation.where(picturizing_id: pict_id).update_all(for_card: "true")
  end

  def destroy_pictures(item, md_for_destruction)
    # destroy each picturizings which id has been passed in for destruction
    item.picturizings.each do | picturizing |
      picturizing.destroy if md_for_destruction.keys.include?(picturizing.id.to_s)
    end
    # if the media_container marked for destruction is not associated with any other picturizing, destroy it
    item.media_containers.each do |md|
      md.destroy if md.picturizings.size == 0
    end
  end
end
