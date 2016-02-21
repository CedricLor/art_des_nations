class ExternalLinksUpdateForm
  include ActiveModel::Model

  attr_accessor :parent_id, :parent_type, :existing_external_links, :new_external_links
  attr_reader :parent

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
    @parent = Object.const_get("#{parent_type}").find(parent_id)

    persist_existing_external_links
    persist_new_external_links
  end # End persist!

  def persist_existing_external_links
    existing_external_links.each do | external_link |
      ExternalLink.find(external_link[0]).update(
        name: external_link[1][:name],
        url: external_link[1][:url]
      )
    end
  end

  def persist_new_external_links
    new_external_links.each do | external_link |
      if external_link[1][:name].present? || external_link[1][:url].present?
        new_external_link = ExternalLink.create(
          name: external_link[1][:name],
          url: external_link[1][:url]
        )
        new_external_link.external_linkings.create(
          external_linkable_id: "#{parent_id}",
          external_linkable_type: "#{parent_type}"
        )
      end
    end
  end
end
