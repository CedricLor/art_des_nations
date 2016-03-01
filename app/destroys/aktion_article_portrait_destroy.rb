class AktionArticlePortraitDestroy

  def self.destroy(item)
    PicturizingsDestroy.destroy_with_content(item.id, item.class.name)
    item.destroy
  end
end
