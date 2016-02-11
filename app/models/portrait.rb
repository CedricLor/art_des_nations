class Portrait < ActiveRecord::Base
  validates :title, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for a portrait. Choose between draft, published, featured or archived" }

  has_many :portraitizings, inverse_of: :portrait
  has_many :articles, through: :portraitizings, :source => :portraitizable,
           :source_type => 'Article'
  has_many :aktions, through: :portraitizings, :source => :portraitizable,
           :source_type => 'Aktion'

  has_many :picturizings, :as => :picturizable, inverse_of: :portrait
  has_many :media_containers, through: :picturizings

  has_many :article_linkings, :as => :article_linkable, inverse_of: :portrait
  has_many :articles, through: :article_linkings

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true

  # def self.with_media_containers_ids_for_card
  #   # query = <<-SQL
  #   #  SELECT portraits.*, picturizable_id AS picturizable_id, media_container_id AS media_container_id, source_url AS source_url FROM portraits INNER JOIN picturizings ON picturizings.picturizable_id = portraits.id AND picturizings.picturizable_type = 'Portrait' INNER JOIN media_containers ON media_containers.id = picturizings.media_container_id
  #   #  SQL

  #   query = <<-SQL
  #    SELECT portraits.*, picturizable_id AS picturizable_id, media_container_id AS media_container_id, for_card AS for_card FROM portraits INNER JOIN picturizings ON picturizings.picturizable_id = portraits.id AND picturizings.picturizable_type = 'Portrait' INNER JOIN picturizing_translations ON picturizing_translations.picturizing_id = picturizings.id WHERE for_card = 'true'
  #    SQL

  #   # a.rows
  #   # => [["2", "2016-02-09 22:13:15.034609", "2016-02-09 22:13:15.624307", "2", "1", "true"], ["2", "2016-02-09 22:13:15.034609", "2016-02-09 22:13:15.624307", "2", "1", "true"], ["3", "2016-02-09 22:13:15.102201", "2016-02-09 22:13:15.635592", "3", "1", "true"], ["3", "2016-02-09 22:13:15.102201", "2016-02-09 22:13:15.635592", "3", "5", "true"], ["3", "2016-02-09 22:13:15.102201", "2016-02-09 22:13:15.635592", "3", "4", "true"], ["4", "2016-02-09 22:13:15.164498", "2016-02-09 22:13:15.647903", "4", "4", "true"], ["4", "2016-02-09 22:13:15.164498", "2016-02-09 22:13:15.647903", "4", "5", "true"], ["5", "2016-02-09 22:13:15.23209", "2016-02-09 22:13:15.658925", "5", "5", "true"], ["5", "2016-02-09 22:13:15.23209", "2016-02-09 22:13:15.658925", "5", "3", "true"], ["6", "2016-02-09 22:13:15.294031", "2016-02-09 22:13:15.670215", "6", "5", "true"], ["7", "2016-02-09 22:13:15.355187", "2016-02-09 22:13:15.685275", "7", "1", "true"], ["7", "2016-02-09 22:13:15.355187", "2016-02-09 22:13:15.685275", "7", "5", "true"], ["8", "2016-02-09 22:13:15.420927", "2016-02-09 22:13:15.698574", "8", "3", "true"], ["8", "2016-02-09 22:13:15.420927", "2016-02-09 22:13:15.698574", "8", "5", "true"], ["9", "2016-02-09 22:13:15.484669", "2016-02-09 22:13:15.710196", "9", "2", "true"], ["10", "2016-02-09 22:13:15.558865", "2016-02-09 22:13:15.722333", "10", "2", "true"], ["10", "2016-02-09 22:13:15.558865", "2016-02-09 22:13:15.722333", "10", "2", "true"]]

  #   self.connection.select(query).rows.map do | item |
  #     [Portrait.find(item[0]), MediaContainer.find(item[4])]
  #   end
  # end

  def self.with_media_containers_for_card(locale)
    # 1. Select all the portraits
    portraits = Portrait.all
    # 2. Select all the portrait translation in the current locale corresponding to the portraits
    locale_portrait_translations = Portrait::Translation.where(locale: locale || I18n.default_locale, portrait_id: portraits.map { |a| a.id })
    # 3. Create an array of hashes with the portraits and the corresponding title
    i = -1
    portraits_with_title = locale_portrait_translations.map do |pt|
      i = i + 1
      {
        item_id: pt.portrait_id,
        title: pt.title,
        item: portraits[i]
      }
    end

    # 4. Select all the picturizings associated with the Portrait and flagged as for card
    picturizings = Picturizing.where(for_card: 'true', picturizable_type: 'Portrait')
    # 5. Create a hashmap of the media_container_ids by portrait_id
    media_container_ids_by_portrait_id = Hash[picturizings.map { |p| [p.picturizable_id, p.media_container_id] }]

    # 6. Select the mediaContainers corresponding to the picturizings (uniq allows to select the mediaContainers only once and sort to sort them for perf)
    media_containers = MediaContainer.find(picturizings.map { |p| p.media_container_id }.uniq.sort)
    # 6. Create a hashmap of the medias url (in size for_card) by mediaContainerIds
    medias_by_media_container_ids = Hash[media_containers.map { |md| [md.id, md.media(:for_card)] }]

    # 7. Add the medias to the portraits
    portraits_with_title.map { |tids| tids.merge({media: medias_by_media_container_ids[media_container_ids_by_portrait_id[tids[:item_id]]]}) }
  end
end

# class CreatePortraits < ActiveRecord::Migration
#   def up
#     create_table :portraits do |t|
#       t.string :title, :null => false
#       t.text :body
#       t.text :teaser
#       t.string :status, :null => false

#       t.timestamps null: false
#     end
#     Portrait.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
#   end

#   def down
#     drop_table :portraits
#     Portrait.drop_translation_table!
#   end
# end
