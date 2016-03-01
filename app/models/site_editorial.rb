class SiteEditorial < ActiveRecord::Base
  include MainModelsModifiers

  validates :home_page_id, presence: true
  validates :home_page_id, numericality: { equal_to: 1 }

  validates :title, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published archived),
    message: "%{value} is not a valid status for an editorial. Choose between draft, published or archived." }
  validates :body, presence: true

  before_validation do |site_editorial|
    site_editorial.home_page_id = 1
  end

  belongs_to :home_page, inverse_of: :site_editorials

  translates :title, :body, :status, :fallbacks_for_empty_translations => true
end
