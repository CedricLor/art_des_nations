# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151215194108) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "article_translations", force: :cascade do |t|
    t.integer  "article_id", null: false
    t.string   "locale",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "title"
    t.text     "body"
    t.text     "teaser"
    t.string   "status"
  end

  add_index "article_translations", ["article_id"], name: "index_article_translations_on_article_id", using: :btree
  add_index "article_translations", ["locale"], name: "index_article_translations_on_locale", using: :btree

  create_table "articles", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.text     "teaser"
    t.string   "status"
    t.datetime "posted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "media_container_translations", force: :cascade do |t|
    t.integer  "media_container_id", null: false
    t.string   "locale",             null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "title"
    t.string   "author"
  end

  add_index "media_container_translations", ["locale"], name: "index_media_container_translations_on_locale", using: :btree
  add_index "media_container_translations", ["media_container_id"], name: "index_media_container_translations_on_media_container_id", using: :btree

  create_table "media_containers", force: :cascade do |t|
    t.string   "title"
    t.string   "author"
    t.string   "source_url"
    t.date     "creation_date"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "media_file_name"
    t.string   "media_content_type"
    t.integer  "media_file_size"
    t.datetime "media_updated_at"
  end

  create_table "picturizing_translations", force: :cascade do |t|
    t.integer  "picturizing_id", null: false
    t.string   "locale",         null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "for_card"
    t.string   "for_carousel"
  end

  add_index "picturizing_translations", ["locale"], name: "index_picturizing_translations_on_locale", using: :btree
  add_index "picturizing_translations", ["picturizing_id"], name: "index_picturizing_translations_on_picturizing_id", using: :btree

  create_table "picturizings", force: :cascade do |t|
    t.integer "media_container_id",            null: false
    t.integer "picturizable_id",               null: false
    t.string  "picturizable_type",  limit: 20, null: false
    t.string  "for_card",           limit: 8,  null: false
    t.string  "for_carousel",       limit: 12, null: false
  end

  add_index "picturizings", ["media_container_id"], name: "index_picturizings_on_media_container_id", using: :btree
  add_index "picturizings", ["picturizable_id", "picturizable_type"], name: "index_picturizings_on_picturizable_id_and_picturizable_type", using: :btree

end
