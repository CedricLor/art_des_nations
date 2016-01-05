# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


statusOfArticles = ["draft", "published", "featured", "archived"]

def fakerForBody
  paragraphsArray = Faker::Hipster.paragraphs(5, true)
  body = ""
  paragraphsArray.each do | paragraph |
    body << "<p>#{paragraph}</p>"
  end
  body
end

20.times do
  article = Article.create({
    title:      "Fr - #{Faker::Hipster.sentence(3, true, 4)}",
    teaser:     Faker::Hipster.paragraph(4),
    body:       fakerForBody,
    status:     statusOfArticles.sample,
    posted_at:  Faker::Date.backward(rand(5..30))
  })
end

I18n.locale = :en

Article.all.each do | article |
  article.update({
    title:  "En -#{Faker::Hipster.sentence(3, true, 4)}",
    teaser: Faker::Hipster.paragraph(4),
    body:   fakerForBody
  })
end
