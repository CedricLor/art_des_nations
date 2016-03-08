# lib/my_modules/linkings.rb

module Linkings
  def caller_id
    @id
  end

  def caller_type
    self.class.name
  end

  def existing_links
    Linking.for(self.class.name, id)
  end

  def linkables
    Article.includes(:translations).
      includes(picturizings: [:translations, :media_container]).
      includes(categorizings: [category: :translations]) +
    Aktion.includes(:translations).
      includes(picturizings: [:translations, :media_container]).
      includes(categorizings: [category: :translations]) +
    Portrait.includes(:translations).
      includes(picturizings: [:translations, :media_container]).
      includes(categorizings: [category: :translations])
  end
end
