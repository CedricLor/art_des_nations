class AddGalleryRefToMediaContainers < ActiveRecord::Migration
  def change
    add_reference :media_containers, :gallery, index: true, foreign_key: true
  end
end
