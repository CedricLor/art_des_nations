class SiteEditorial < ActiveRecord::Base
  include MainModelsModifiers

  # validations
  validates :home_page_id, presence: true
  validates :home_page_id, numericality: { equal_to: 1 }

  validates :title, presence: true
  validates :body, presence: true

  validates :posted_at, presence: true

  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an editorial. Choose between draft, published, featured or archived." }
  validate :refuse_remove_featured_if_no_other_featured, on: :update

  # callbacks
  before_validation do |site_editorial|
    site_editorial.home_page_id = 1
  end
  after_commit :remove_other_featured, if: Proc.new { |site_editorial| site_editorial.status == "featured" }

  # associations
  belongs_to :home_page, inverse_of: :site_editorials
  translates :title, :body, :status, :fallbacks_for_empty_translations => true

  def teaser
    self.body
  end

  def picturizings
    nil
  end

  protected

  def remove_other_featured
    SiteEditorial.where(status: 'featured').where.not(id: id).each do |site_editorial|
      site_editorial.status = 'published'
      site_editorial.save(validate: false)
    end
  end

  def refuse_remove_featured_if_no_other_featured
    if self.translation.status_was == "featured" && self.status != "featured" && SiteEditorial.where(status: 'featured').count == 1
      errors.add(:status,
        I18n.t(:featured_cannot_be_turn_off_error_message,
          default: "This editorial is currently 'featured'. You cannot turn off the 'featured' status of the currently 'featured' editorial. Instead, turn on the 'featured' status of another editorial (and this one will automatically be turned to 'published').")
      )
    end
  end
end

# use cases :
# 1. a new edito is created and the user wants it to be featured -> remove the featured flag from all other editos
# 2. the user turns an edito unfeatured and has not yet created a featured edito
