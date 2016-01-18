class Article < ActiveRecord::Base
  has_and_belongs_to_many :galleries
  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true
end
