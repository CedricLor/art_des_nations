class CreatePortraitIntros < ActiveRecord::Migration
  def up
    create_table :portrait_intros do |t|
      t.timestamps null: false
    end
    PortraitIntro.create_translation_table! intro: :text
  end

  def down
    drop_table :portrait_intros
    PortraitIntro.drop_translation_table!
  end
end
