class CountryUpdateForm
  include ActiveModel::Model

  attr_accessor :id, :title, :editorial, :external_links
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

    ExternalLinksUpdateForm.
      new(
        parent: @country,
        existing_external_links: external_links["existing_external_links"],
        new_external_links: external_links["new_external_links"]
      ).
      update
  end # End persist!

end
