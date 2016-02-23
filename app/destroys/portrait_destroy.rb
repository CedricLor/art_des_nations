class PortraitDestroy

  def self.destroy(portrait_id)
    byebug
    PicturizingsDestroy.destroy_with_content(portrait_id, "Portrait")
    byebug
    Portrait.destroy(portrait_id)
  end
end
