module LinkingsHelper

  def name_and_path_for_link_super_title(element)
    name = "&nbsp;"
    path = ""

    if element.categorizings.present?
      name = element.categorizings[0].category.name
      path = category_path(element.categorizings[0].category)
    elsif element.class.name == "Portrait"
      name = t(:portraits, default: "Portraits")
      path = protagonistes_path
    elsif element.respond_to?(:country)
      name = element.country.name; path = country_path(element.country);
    end

    return name, path
  end

end
