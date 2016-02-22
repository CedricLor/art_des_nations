class CountryUpdateForm
  include ActiveModel::Model

  attr_accessor :id, :title, :editorial, :external_linkings
  attr_reader :country

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
    @country = Country.find(@id)

    @country.update(
      title: title,
      editorial: editorial
    )

    ExternalLinksUpdateForm.new(
        parent: @country,
        existing_external_links: external_linkings["existing_external_links"],
        marked_for_deletion: external_linkings["marked_for_deletion"],
        new_external_links: external_linkings["new_external_links"]
      ).
      update
  end # End persist!

end
