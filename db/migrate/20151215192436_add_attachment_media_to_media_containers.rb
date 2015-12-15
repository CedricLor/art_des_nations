class AddAttachmentMediaToMediaContainers < ActiveRecord::Migration
  def self.up
    change_table :media_containers do |t|
      t.attachment :media
    end
  end

  def self.down
    remove_attachment :media_containers, :media
  end
end
