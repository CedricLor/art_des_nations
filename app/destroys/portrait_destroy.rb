class PortraitDestroy

  def self.destroy(portrait_id)
    PicturizingsDestroy.destroy_with_content(portrait_id, "Portrait")
    Portrait.destroy(portrait_id)
  end
end
