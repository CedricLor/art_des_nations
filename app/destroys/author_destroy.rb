class AuthorDestroy

  def self.destroy_with_article_acmb(author_id)
    @author_to_destroy = Author.includes(:articles).find(author_id)
    @author_to_destroy.destroy if @author_to_destroy.articles.length <= 1
  end

  def self.destroy_with_all_its_articles(author_id)
    @author_to_destroy = Author.find(author_id)
    @author_to_destroy.articles.destroy_all
    @author_to_destroy.destroy
  end
end
