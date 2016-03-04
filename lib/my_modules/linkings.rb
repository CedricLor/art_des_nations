# lib/my_modules/linkings.rb

module Linkings

  def set_linking_id=(val)
    @linking_id = val
  end

  def get_linking_id
    @linking_id
  end

  def existing_links
    to_links = Linking.
      includes(to_linkable: [:translations, {categorizings: [category: :translations]}]).
      where(from_linkable_id: id, from_linkable_type: self.class.name)
    from_links = Linking.
      includes(from_linkable: [:translations, {categorizings: [category: :translations]}]).
      where(to_linkable_id: id, to_linkable_type: self.class.name)

    processed_to_linkables = add_linking_ids_to_linkables(to_links, [], 'to_linkable')
    processed_from_linkables = add_linking_ids_to_linkables(from_links, [], 'from_linkable')

    processed_to_linkables + processed_from_linkables
  end

  def linkables
    linkables = Article.includes(:translations).
      includes(picturizings: [:translations, media_container: :translations]).
      includes(categorizings: [category: :translations]) +
      Aktion.includes(:translations).
      includes(picturizings: [:translations, media_container: :translations]).
      includes(categorizings: [category: :translations]) +
      Portrait.includes(:translations).
      includes(picturizing: [:translations, media_container: :translations]).
      includes(categorizings: [category: :translations])
  end

  def add_linking_ids_to_linkables(linkings_collection, linkable_collection, direction)
    linkings_collection.each do | linking |
      if direction == 'to_linkable'
        linking.to_linkable.set_linking_id = linking.id
        linkable_collection << linking.to_linkable
      else
        linking.from_linkable.set_linking_id = linking.id
        linkable_collection << linking.from_linkable
      end
    end
    linkable_collection
  end
end
