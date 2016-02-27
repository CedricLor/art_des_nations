# lib/my_modules/article_forms.rb

module ArticleForms
  def handle_author_name
    byebug
    # 1. if nothing has changed, return true
    return true if @article.author_id.to_s == author_id && (@article.author.full_name == create_new_author || create_new_author.blank?)
    # 2. else if the user has entered a new name in the input field, create author and assign it the article
    # if the user has both changed the author from the list and entered a new name in the field,
    # we skip the registration of another author from the list
    return create_author_and_assign_article if (create_new_author.present? && @article.author.full_name != create_new_author)
    # 3. else if the user has selected a different author in the list, update the article and return
    return @article.update(author_id: author_id) if @article.author_id.to_s != author_id
  end

  def create_author_and_assign_article
    author = Author.create(full_name: create_new_author)
    @article.update(author_id: author.id)
  end
end
