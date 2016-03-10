
module OgMetaTagsSetter
  def set_og_meta_tags(item)
    @og_title = item.title
    @og_description = item.teaser.truncate_words(30, omission: t(:truncating_omission, default: '... (continued)')) if @aktion.teaser
    @og_image_url = item.picturizings(for_carousel: true).first.media_container.media(:for_carousel) if item.picturizings.present?
  end
end
