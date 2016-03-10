
module OgMetaTagsSetter
  def set_og_meta_tags(item)
    @og_title = item.title if item.title.present?
    @og_description = Nokogiri::HTML(item.teaser).text.truncate_words(50, omission: t(:truncating_omission, default: '... (continued)')) if item.teaser.present?
    @og_image_url = item.picturizings(for_carousel: true).first.media_container.media(:for_carousel) if item.picturizings.present?
    @og_article_section = item.categories.first.name if item.respond_to?(:categories) && item.categories.present?
    @article_author = item.author.full_name if item.respond_to?(:author) && item.author.present?
  end
end
