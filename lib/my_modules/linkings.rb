# lib/my_modules/linkings.rb

module Linkings
  def existing_links
    to_links = Linking.includes(:to_linkable).
      where(from_linkable_id: id, from_linkable_type: self.class.name)
    from_links = Linking.includes(:from_linkable).
      where(to_linkable_id: id, to_linkable_type: self.class.name)

    to_links.
      map{ |l| l.to_linkable } + from_links.map{ |l| l.from_linkable }.
      sort{|a,b| a.sorting_field <=> b.sorting_field}
  end

  def linkables
    linkables = Article.all + Aktion.all + Portrait.all
  end
end
