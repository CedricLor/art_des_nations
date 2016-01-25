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

  create_table "article_picture_translations", force: :cascade do |t|
    t.integer  "article_picture_id", null: false
    t.string   "locale",             null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "for_card"
    t.string   "for_carousel"
  end

  add_index "article_picture_translations", ["article_picture_id"], name: "index_article_picture_translations_on_article_picture_id", using: :btree
  add_index "article_picture_translations", ["locale"], name: "index_article_picture_translations_on_locale", using: :btree

  create_table "article_pictures", force: :cascade do |t|
    t.integer "article_id"
    t.integer "media_container_id"
    t.string  "for_card"
    t.string  "for_carousel"
  end

  add_index "article_pictures", ["article_id"], name: "index_article_pictures_on_article_id", using: :btree
  add_index "article_pictures", ["media_container_id"], name: "index_article_pictures_on_media_container_id", using: :btree

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
    t.string   "source"
  end

  add_index "media_container_translations", ["locale"], name: "index_media_container_translations_on_locale", using: :btree
  add_index "media_container_translations", ["media_container_id"], name: "index_media_container_translations_on_media_container_id", using: :btree

  create_table "media_containers", force: :cascade do |t|
    t.string   "title"
    t.string   "author"
    t.string   "source"
    t.date     "creation_date"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "media_file_name"
    t.string   "media_content_type"
    t.integer  "media_file_size"
    t.datetime "media_updated_at"
  end

end
