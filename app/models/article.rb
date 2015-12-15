class Article < ActiveRecord::Base
  translates :title, :body, :teaser
end
