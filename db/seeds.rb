# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 1. Users

user = User.create!(email: 'cedric.lor@gmail.com', password: '1234567890', password_confirmation: "1234567890", admin: true)

# 2. Authors

5.times do
  Author.create!({
    full_name: Faker::Name.name
  })
end
author_ids = Author.all.map { |author| author.id }

# 3. Categories

french_categories = ["Danse", "Histoire", "Littérature", "Opéra", "Philosophie", "Photographie", "Théâtre"]
english_categories = ["Dance", "History", "Literature", "Opera", "Philosophy", "Photography", "Theatre"]

def fakerForBody
  paragraphsArray = Faker::Hipster.paragraphs(5, true)
  body = ""
  paragraphsArray.each do | paragraph |
    body << "<p>#{paragraph}</p>"
  end
  body
end

french_categories.each do | f_cat |
  Category.create!(
    name: f_cat,
    editorial: fakerForBody
  )
end

I18n.locale = :en

Category.all.each_with_index do | cat, i |
  cat.update!(
    name: english_categories[i],
    editorial: fakerForBody
  )
end

I18n.locale = :fr

category_ids = Category.all.map { |cat| cat.id }

# 3. MediaContainers

test_photos = ["china-eu.png", "china_5.jpg", "great-wall-of-china.jpg", "russia_lake_maxresdefault.jpg", "staraya-ladoga-russia-1.jpg"]

test_photos.each do | test_photos |
  MediaContainer.create!(
    title: Faker::Lorem.sentence,
    author: Faker::Name.name,
    source_url: Faker::Internet.url('example.com'),
    creation_date: Faker::Date.backward(rand(5..30)),
    media: File.new("/Users/cedriclor/Desktop/Test_photos/#{test_photos}")
  )
  MediaContainer
end

I18n.locale = :en

MediaContainer.all.each do | md |
  md.update!(
    title: Faker::Lorem.sentence
  )
end

I18n.locale = :fr

media_container_ids = MediaContainer.all.map { |md| md.id }

# 4. Articles

statusOfArticles = ["draft", "published", "featured", "archived"]

def create_article(author_ids, statusOfArticles)
  Article.create!({
    author_id: author_ids.sample,
    title:     "Fr - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser:    Faker::Hipster.paragraph(4),
    body:      fakerForBody,
    status:    statusOfArticles.sample,
    posted_at: Faker::Date.backward(rand(5..30)),
    posted_from_location: "Paris"
  })
end

def create_picturizing(article_id, media_container_id)
  Picturizing.create!({
    media_container_id: media_container_id,
    picturizable_id: article_id,
    picturizable_type: "Article",
    for_carousel: ["true", "false"].sample,
    for_card: ["true", "false"].sample,
  })
end

def create_categorizing(article_id, category_id)
  Categorizing.create!({
    category_id: category_id,
    categorizable_id: article_id,
    categorizable_type: "Article"
  })
end

20.times do
  article = create_article(author_ids, statusOfArticles)
  3.times do
    create_picturizing(article.id, media_container_ids.sample)
  end
  3.times do
    create_categorizing(article.id, category_ids.sample)
  end
end

article_ids = Article.all.map { |art| art.id }

def create_article_linking(article_id, article_linkable_id, article_linkable_type)
  ArticleLinking.create!(
    article_id: article_id,
    article_linkable_id: article_linkable_id,
    article_linkable_type: article_linkable_type
  )
end

def create_article_linkings(article_id, article_ids)
  article_ids_except_current_art_id = article_ids - [ article_id ]
  3.times do
    create_article_linking(article_id, article_ids_except_current_art_id.sample, "Article")
  end
end

def create_english_versions_of_article(article, statusOfArticles)
  I18n.locale = :en
  article.update!({
    title:  "En -#{Faker::Hipster.sentence(3, true, 4)}",
    teaser: Faker::Hipster.paragraph(4),
    status: statusOfArticles.sample,
    body:   fakerForBody
  })
  I18n.locale = :fr
end

Article.all.each do | article |
  create_article_linkings(article.id, article_ids)
  create_english_versions_of_article(article, statusOfArticles)
end

# 5. Countries

Country.create!(
  name: "Russie",
  title: "En Russie",
  editorial: fakerForBody
)

Country.create!(
  name: "Chine",
  title: "En Chine",
  editorial: fakerForBody
)

I18n.locale = :en

Country.first.update!(
  name: "Russia",
  title: "In Russia",
  editorial: fakerForBody
)

Country.first.update!(
  name: "China",
  title: "In China",
  editorial: fakerForBody
)

I18n.locale = :fr

# 7. Actions

def create_action(statusOfArticles)
  Action.create!({
    country_id:   [1, 2].sample,
    title:       "Fr - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser:      Faker::Hipster.paragraph(4),
    body:        fakerForBody,
    status:      statusOfArticles.sample,
    posted_at:   Faker::Date.backward(rand(5..30)),
    action_date: Faker::Date.forward(rand(30..60))
  })
end

20.times do
  action = create_action(statusOfArticles)
  3.times do
    create_picturizing(action.id, media_container_ids.sample)
  end
  3.times do
    create_categorizing(action.id, category_ids.sample)
  end
  3.times do
    create_article_linking(article_ids.sample, action.id, "Action")
  end
end

I18n.locale = :en

Action.all.each do | action |
  action.update!(
    title: "En - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser: Faker::Hipster.paragraph(4),
    body:   fakerForBody,
    status: statusOfArticles.sample
  )
end

I18n.locale = :fr

action_ids = Action.all.map {|action| action.id }

# 8. External links

20.times do
  ExternalLink.create!(
    name: Faker::Hipster.sentence(3, true, 4),
    url: Faker::Internet.url('www.example.com')
  )
end

external_link_ids = ExternalLink.all.map { |el| el.id }

# 9. Static pages

HomePage.create!(
  call_to_action: Faker::Hipster.sentence(10),
  article_id: Article.all.sample.id
)

static_pages_french_titles = ["Le Projet ADN", "Crédits", "Mentions Légales", "Nous contacter"]
static_pages_english_titles = ["The ADN Project", "Credits", "Legal Mentions", "Contact us"]

static_pages_french_titles.each do | fr_title |
  StaticPage.create!(
    title: fr_title,
    teaser: Faker::Hipster.paragraph(4),
    body: fakerForBody
  )
end

I18n.locale = :en

StaticPage.all.each_with_index do | sp, i |
  sp.update!(
    title: static_pages_english_titles[i],
    teaser: Faker::Hipster.paragraph(4),
    body: fakerForBody
  )
end

I18n.locale = :fr

# 10. External linking

external_link_ids.shuffle.each_slice(5).to_a[1].each do | el_id |
  ExternalLinking.create!(
    external_link_id: el_id,
    external_linkable_id: HomePage.first.id,
    external_linkable_type: "HomePage"
  )
end

Country.all.each do | country |
  external_link_ids.shuffle.each_slice(5).to_a[1].each do | el_id |
    ExternalLinking.create!({
      external_link_id: el_id,
      external_linkable_id: country.id,
      external_linkable_type: "Country"
    })
  end
end

# 11. Portraits

def create_portraits(statusOfArticles)
  Portrait.create!({
    title:       "Fr - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser:      Faker::Hipster.paragraph(4),
    body:        fakerForBody,
    status:      statusOfArticles.sample
  })
end

10.times do
  portrait = create_portraits(statusOfArticles)
  3.times do
    create_picturizing(portrait.id, media_container_ids.sample)
  end
  3.times do
    create_article_linking(article_ids.sample, portrait.id, "Portrait")
  end
end

I18n.locale = :en

Portrait.all.each do | portrait |
  portrait.update!(
    title: "En - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser: Faker::Hipster.paragraph(4),
    body:   fakerForBody,
    status: statusOfArticles.sample
  )
end

I18n.locale = :fr

portrait_ids = Portrait.all.map {|action| action.id }

# 12. Portraitizings

def add_portrait_to_action_or_article(portrait_id, item_id, item_type)
  Portraitizing.create!(
    portrait_id: portrait_id,
    portraitizable_id: item_id,
    portraitizable_type: item_type
  )
end

action_ids.each do |action_id|
  portrait_ids.shuffle.each_slice(3).to_a[1].each do | portrait_id |
    add_portrait_to_action_or_article(portrait_id, action_id, "Action")
  end
end

article_ids.each do |article_id|
  portrait_ids.shuffle.each_slice(3).to_a[1].each do | portrait_id |
    add_portrait_to_action_or_article(portrait_id, article_id, "Article")
  end
end
