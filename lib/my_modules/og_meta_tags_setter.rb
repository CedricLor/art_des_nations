
module OgMetaTagsSetter
  def set_og_meta_tags(item)
    @og_title = item.title
    @og_description = Nokogiri::HTML(item.teaser).text.truncate_words(50, omission: t(:truncating_omission, default: '... (continued)')) if item.teaser
    @og_image_url = item.picturizings(for_carousel: true).first.media_container.media(:for_carousel) if item.picturizings.present?
  end
end
