# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 1. Users

user = User.create!(email: 'cedric.lor@gmail.com', password: '1234567890', password_confirmation: '1234567890', admin: true)
user = User.create!(email: 'sebastien@artiscode.net', password: '1234567890', password_confirmation: '1234567890', admin: true)

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

test_photos.each do | test_photo |
  MediaContainer.create!(
    title: Faker::Lorem.sentence,
    author: Faker::Name.name,
    source_url: Faker::Internet.url('example.com'),
    creation_date: Faker::Date.backward(rand(5..30)),
    media: File.new("#{Rails.root}/app/assets/images/#{test_photo}")
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

def create_picturizing(picturizable_id, media_container_id, picturizable_type)
  Picturizing.create!({
    media_container_id: media_container_id,
    picturizable_id: picturizable_id,
    picturizable_type: picturizable_type,
    for_carousel: ["true", "false"].sample,
    for_card: ["true", "false"].sample,
  })
end

def create_categorizing(categorizable_id, category_id, categorizable_type)
  Categorizing.create!({
    category_id: category_id,
    categorizable_id: categorizable_id,
    categorizable_type: categorizable_type
  })
end

20.times do
  article = create_article(author_ids, statusOfArticles)
  3.times do
    create_picturizing(article.id, media_container_ids.sample, "Article")
  end
  3.times do
    create_categorizing(article.id, category_ids.sample, "Article")
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

Country.second.update!(
  name: "China",
  title: "In China",
  editorial: fakerForBody
)

I18n.locale = :fr

# 7. Aktions

def create_aktion(statusOfArticles)
  Aktion.create!({
    country_id:   [1, 2].sample,
    title:       "Fr - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser:      Faker::Hipster.paragraph(4),
    body:        fakerForBody,
    status:      statusOfArticles.sample,
    posted_at:   Faker::Date.backward(rand(5..30)),
    aktion_date: Faker::Date.forward(rand(30..60))
  })
end

20.times do
  aktion = create_aktion(statusOfArticles)
  3.times do
    create_picturizing(aktion.id, media_container_ids.sample, "Aktion")
  end
  3.times do
    create_categorizing(aktion.id, category_ids.sample, "Aktion")
  end
  3.times do
    create_article_linking(article_ids.sample, aktion.id, "Aktion")
  end
end

I18n.locale = :en

Aktion.all.each do | aktion |
  aktion.update!(
    title: "En - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser: Faker::Hipster.paragraph(4),
    body:   fakerForBody,
    status: statusOfArticles.sample
  )
end

I18n.locale = :fr

aktion_ids = Aktion.all.map {|aktion| aktion.id }

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
  call_to_action: Faker::Hipster.sentence(10)
)
SiteEditorial.create!(
  title: Faker::Hipster.sentence(3),
  body: "FR - " + fakerForBody,
  status: "published"
)

I18n.locale = :en
HomePage.first.update!(
  call_to_action: Faker::Hipster.sentence(10),
)
SiteEditorial.first.update!(
  title: Faker::Hipster.sentence(3),
  body: "EN - " + fakerForBody,
  status: "published"
)
I18n.locale = :fr


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

portrait_intro = PortraitIntro.create!({
  intro: fakerForBody
})

I18n.locale = :en
portrait_intro.update!({
  intro: fakerForBody
})
I18n.locale = :fr

def create_portraits(statusOfArticles)
  Portrait.create!({
    title:       "Fr - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser:      Faker::Hipster.paragraph(4),
    status:      statusOfArticles.sample,
    body:        <<-eos
  <h3>Théâtre (auteur)</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2002</span> <em>Mariage</em> suivi de <em>L'Association</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2004</span> <em>L'Amélioration</em> suivi de <em>L'Instrument à pression</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2004</span> <em>L'Après-Guerre</em></li>
    <li><span class="annee">2004</span> <em>Tragique Troupier</em></li>
    <li><span class="annee">2007</span> <em>Un homme en faillite</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2007</span> <em>L'Européenne</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2008</span> <em>Nos occupations</em> suivi de <em>La Commission centrale de l'enfance</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2011</span> <em>Les Jeunes</em> suivi de <em>On refait tout</em> et de <em>Réfection</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2012</span> <em>Le Système de Ponzi</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2015</span> <em>Les Glaciers grondants</em> suivi de <em>Le plus près possible</em>, Théâtre Actes Sud-Papiers</li>
  </ul>
  <h3>Essai</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2001</span> <em>Dramaturgies de la guerre</em>, Circe</li>
  </ul>
  <h3>Auteur, Comédien et/ou Metteur en scène (récent) </h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2007</span> <em>Un homme en faillite</em>, Théâtre de la Ville Paris </li>
    <li><span class="annee">2008</span> <em>La Commission centrale de l’enfance</em>, Théâtre de la Ville Paris </li>
    <li><span class="annee">2009</span> <em>L’Européenne</em> texte, Théâtre de la Ville Paris </li>
    <li><span class="annee">2010</span> <em>Nos occupations</em> texte, <abbr title="Centre dramatique national">CDN</abbr> Orléans  </li>
    <li><span class="annee">2012</span> <em>Le Système de Ponzi</em> Théâtre de la Ville Paris</li>
    <li><span class="annee">2013, 2014</span> <em>Ceux qui restent</em>, d'après l'histoire de Paul Felenbok et Włodka Blit-Robertson, Le Montfort</li>
    <li><span class="annee">2015</span> <em>Les Glaciers Grondants</em> Théâtre de la Ville Paris</li>
  </ul>
  <h3>Opéra</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2011</span> <em>The Rake's Progress</em> (Stravinsky) Opéra de Lille</li>
    <li><span class="annee">2013</span> <em>Il Mondo de la Luna</em> (Haydn) Atelier Lyrique Opéra Bastille</li>
    <li><span class="annee">2014</span> <em>La Finta Giardiniera</em> (Mozart) Opéra de Lille</li>
  </ul>
  <h3>Cinéma</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2006</span> <em>Je me fais rare</em> de Dante Desarthe</li>
  </ul>
  <h3>Prix et récompenses</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2007</span> Prix du Syndicat de la critique de la meilleure création d'une pièce en langue française pour <em>Un homme en faillite</em></li>
    <li><span class="annee">2008</span> Prix Nouveau Talent Théâtre de la <abbr title="Société des ...">SACD</abbr> pour <em>L'Européenne</em></li>
    <li><span class="annee">2008</span> Grand prix de littérature dramatique pour <em>L'Européenne</em></li>
    <li><span class="annee">2009</span> Molière de la révélation théâtrale masculine pour <em>La Commission centrale de l'enfance</em></li>
  </ul>
eos
  })
end

10.times do
  portrait = create_portraits(statusOfArticles)
  create_picturizing(portrait.id, media_container_ids.sample, "Portrait")
  3.times do
    create_article_linking(article_ids.sample, portrait.id, "Portrait")
  end
  2.times do
    create_categorizing(portrait.id, category_ids.sample, "Portrait")
  end
end

I18n.locale = :en

Portrait.all.each do | portrait |
  portrait.update!(
    title:  "En - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser: Faker::Hipster.paragraph(4),
    status: statusOfArticles.sample,
    body:   <<-eos
  <h3>Théâtre (auteur)</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2002</span> <em>Mariage</em> suivi de <em>L'Association</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2004</span> <em>L'Amélioration</em> suivi de <em>L'Instrument à pression</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2004</span> <em>L'Après-Guerre</em></li>
    <li><span class="annee">2004</span> <em>Tragique Troupier</em></li>
    <li><span class="annee">2007</span> <em>Un homme en faillite</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2007</span> <em>L'Européenne</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2008</span> <em>Nos occupations</em> suivi de <em>La Commission centrale de l'enfance</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2011</span> <em>Les Jeunes</em> suivi de <em>On refait tout</em> et de <em>Réfection</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2012</span> <em>Le Système de Ponzi</em>, Théâtre Actes Sud-Papiers</li>
    <li><span class="annee">2015</span> <em>Les Glaciers grondants</em> suivi de <em>Le plus près possible</em>, Théâtre Actes Sud-Papiers</li>
  </ul>
  <h3>Essai</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2001</span> <em>Dramaturgies de la guerre</em>, Circe</li>
  </ul>
  <h3>Auteur, Comédien et/ou Metteur en scène (récent) </h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2007</span> <em>Un homme en faillite</em>, Théâtre de la Ville Paris </li>
    <li><span class="annee">2008</span> <em>La Commission centrale de l’enfance</em>, Théâtre de la Ville Paris </li>
    <li><span class="annee">2009</span> <em>L’Européenne</em> texte, Théâtre de la Ville Paris </li>
    <li><span class="annee">2010</span> <em>Nos occupations</em> texte, <abbr title="Centre dramatique national">CDN</abbr> Orléans  </li>
    <li><span class="annee">2012</span> <em>Le Système de Ponzi</em> Théâtre de la Ville Paris</li>
    <li><span class="annee">2013, 2014</span> <em>Ceux qui restent</em>, d'après l'histoire de Paul Felenbok et Włodka Blit-Robertson, Le Montfort</li>
    <li><span class="annee">2015</span> <em>Les Glaciers Grondants</em> Théâtre de la Ville Paris</li>
  </ul>
  <h3>Opéra</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2011</span> <em>The Rake's Progress</em> (Stravinsky) Opéra de Lille</li>
    <li><span class="annee">2013</span> <em>Il Mondo de la Luna</em> (Haydn) Atelier Lyrique Opéra Bastille</li>
    <li><span class="annee">2014</span> <em>La Finta Giardiniera</em> (Mozart) Opéra de Lille</li>
  </ul>
  <h3>Cinéma</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2006</span> <em>Je me fais rare</em> de Dante Desarthe</li>
  </ul>
  <h3>Prix et récompenses</h3>
  <ul class="liste-chronologique">
    <li><span class="annee">2007</span> Prix du Syndicat de la critique de la meilleure création d'une pièce en langue française pour <em>Un homme en faillite</em></li>
    <li><span class="annee">2008</span> Prix Nouveau Talent Théâtre de la <abbr title="Société des ...">SACD</abbr> pour <em>L'Européenne</em></li>
    <li><span class="annee">2008</span> Grand prix de littérature dramatique pour <em>L'Européenne</em></li>
    <li><span class="annee">2009</span> Molière de la révélation théâtrale masculine pour <em>La Commission centrale de l'enfance</em></li>
  </ul>
eos
  )
end

I18n.locale = :fr

portrait_ids = Portrait.all.map {|portrait| portrait.id }

# 12. Portraitizings

def add_portrait_to_aktion_or_article(portrait_id, item_id, item_type)
  Portraitizing.create!(
    portrait_id: portrait_id,
    portraitizable_id: item_id,
    portraitizable_type: item_type
  )
end

aktion_ids.each do |aktion_id|
  portrait_ids.shuffle.each_slice(3).to_a[1].each do | portrait_id |
    add_portrait_to_aktion_or_article(portrait_id, aktion_id, "Aktion")
  end
end

article_ids.each do |article_id|
  portrait_ids.shuffle.each_slice(3).to_a[1].each do | portrait_id |
    add_portrait_to_aktion_or_article(portrait_id, article_id, "Article")
  end
end

