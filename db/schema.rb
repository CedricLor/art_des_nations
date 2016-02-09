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

ActiveRecord::Schema.define(version: 20160208200059) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_translations", force: :cascade do |t|
    t.integer  "action_id",  null: false
    t.string   "locale",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "title",      null: false
    t.text     "body"
    t.text     "teaser"
    t.string   "status",     null: false
  end

  add_index "action_translations", ["action_id"], name: "index_action_translations_on_action_id", using: :btree
  add_index "action_translations", ["locale"], name: "index_action_translations_on_locale", using: :btree

  create_table "actions", force: :cascade do |t|
    t.integer  "country_id",  null: false
    t.datetime "posted_at",   null: false
    t.datetime "action_date", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "article_linkings", force: :cascade do |t|
    t.integer "article_id",            null: false
    t.integer "article_linkable_id",   null: false
    t.string  "article_linkable_type", null: false
  end

  add_index "article_linkings", ["article_id"], name: "index_article_linkings_on_article_id", using: :btree
  add_index "article_linkings", ["article_linkable_id", "article_linkable_type"], name: "index_article_linkings_on_linkable_id_and_type", using: :btree

  create_table "article_translations", force: :cascade do |t|
    t.integer  "article_id",           null: false
    t.string   "locale",               null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "title",                null: false
    t.text     "body"
    t.text     "teaser"
    t.text     "posted_from_location"
    t.string   "status",               null: false
  end

  add_index "article_translations", ["article_id"], name: "index_article_translations_on_article_id", using: :btree
  add_index "article_translations", ["locale"], name: "index_article_translations_on_locale", using: :btree

  create_table "articles", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.datetime "posted_at",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "authors", force: :cascade do |t|
    t.string   "full_name",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categorizings", force: :cascade do |t|
    t.integer "category_id",                   null: false
    t.integer "categorizable_id",              null: false
    t.string  "categorizable_type", limit: 20, null: false
  end

  add_index "categorizings", ["categorizable_id", "categorizable_type"], name: "index_categorizings_on_categorizable_id_and_type", using: :btree
  add_index "categorizings", ["category_id"], name: "index_categorizings_on_category_id", using: :btree

  create_table "category_translations", force: :cascade do |t|
    t.integer  "category_id", null: false
    t.string   "locale",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name",        null: false
    t.text     "editorial"
  end

  add_index "category_translations", ["category_id"], name: "index_category_translations_on_category_id", using: :btree
  add_index "category_translations", ["locale"], name: "index_category_translations_on_locale", using: :btree

  create_table "countries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "country_translations", force: :cascade do |t|
    t.integer  "country_id",              null: false
    t.string   "locale",                  null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "name",                    null: false
    t.string   "title",      default: "", null: false
    t.text     "editorial",  default: "", null: false
  end

  add_index "country_translations", ["country_id"], name: "index_country_translations_on_country_id", using: :btree
  add_index "country_translations", ["locale"], name: "index_country_translations_on_locale", using: :btree

  create_table "external_link_translations", force: :cascade do |t|
    t.integer  "external_link_id", null: false
    t.string   "locale",           null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "name",             null: false
  end

  add_index "external_link_translations", ["external_link_id"], name: "index_external_link_translations_on_external_link_id", using: :btree
  add_index "external_link_translations", ["locale"], name: "index_external_link_translations_on_locale", using: :btree

  create_table "external_linkings", force: :cascade do |t|
    t.integer "external_link_id",       null: false
    t.integer "external_linkable_id",   null: false
    t.string  "external_linkable_type", null: false
  end

  add_index "external_linkings", ["external_link_id"], name: "index_external_linkings_on_external_link_id", using: :btree
  add_index "external_linkings", ["external_linkable_id", "external_linkable_type"], name: "index_external_linkings_on_linkable_id_and_type", using: :btree

  create_table "external_links", force: :cascade do |t|
    t.string   "url",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "home_page_translations", force: :cascade do |t|
    t.integer  "home_page_id",   null: false
    t.string   "locale",         null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.text     "call_to_action"
  end

  add_index "home_page_translations", ["home_page_id"], name: "index_home_page_translations_on_home_page_id", using: :btree
  add_index "home_page_translations", ["locale"], name: "index_home_page_translations_on_locale", using: :btree

  create_table "home_pages", force: :cascade do |t|
    t.integer  "article_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "media_container_translations", force: :cascade do |t|
    t.integer  "media_container_id",              null: false
    t.string   "locale",                          null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "title",              default: "", null: false
  end

  add_index "media_container_translations", ["locale"], name: "index_media_container_translations_on_locale", using: :btree
  add_index "media_container_translations", ["media_container_id"], name: "index_media_container_translations_on_media_container_id", using: :btree

  create_table "media_containers", force: :cascade do |t|
    t.string   "source_url",         default: "", null: false
    t.date     "creation_date"
    t.string   "author",             default: "", null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "media_file_name"
    t.string   "media_content_type"
    t.integer  "media_file_size"
    t.datetime "media_updated_at"
  end

  create_table "picturizing_translations", force: :cascade do |t|
    t.integer  "picturizing_id",            null: false
    t.string   "locale",                    null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "for_card",       limit: 8,  null: false
    t.string   "for_carousel",   limit: 12, null: false
  end

  add_index "picturizing_translations", ["locale"], name: "index_picturizing_translations_on_locale", using: :btree
  add_index "picturizing_translations", ["picturizing_id"], name: "index_picturizing_translations_on_picturizing_id", using: :btree

  create_table "picturizings", force: :cascade do |t|
    t.integer "media_container_id",            null: false
    t.integer "picturizable_id",               null: false
    t.string  "picturizable_type",  limit: 20, null: false
  end

  add_index "picturizings", ["media_container_id"], name: "index_picturizings_on_media_container_id", using: :btree
  add_index "picturizings", ["picturizable_id", "picturizable_type"], name: "index_picturizings_on_picturizable_id_and_picturizable_type", using: :btree

  create_table "portrait_translations", force: :cascade do |t|
    t.integer  "portrait_id", null: false
    t.string   "locale",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "title",       null: false
    t.text     "body"
    t.text     "teaser"
    t.string   "status",      null: false
  end

  add_index "portrait_translations", ["locale"], name: "index_portrait_translations_on_locale", using: :btree
  add_index "portrait_translations", ["portrait_id"], name: "index_portrait_translations_on_portrait_id", using: :btree

  create_table "portraitizings", force: :cascade do |t|
    t.integer "portrait_id",                    null: false
    t.integer "portraitizable_id",              null: false
    t.string  "portraitizable_type", limit: 20, null: false
  end

  add_index "portraitizings", ["portrait_id"], name: "index_portraitizings_on_portrait_id", using: :btree
  add_index "portraitizings", ["portraitizable_id", "portraitizable_type"], name: "index_portraitizings_on_portraitizable_id_and_type", using: :btree

  create_table "portraits", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "static_page_translations", force: :cascade do |t|
    t.integer  "static_page_id",              null: false
    t.string   "locale",                      null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "title",                       null: false
    t.text     "body",           default: "", null: false
    t.text     "teaser",         default: "", null: false
  end

  add_index "static_page_translations", ["locale"], name: "index_static_page_translations_on_locale", using: :btree
  add_index "static_page_translations", ["static_page_id"], name: "index_static_page_translations_on_static_page_id", using: :btree

  create_table "static_pages", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.text     "teaser"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "admin",                  default: false, null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
