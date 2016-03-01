class AktionForm < AktionArticleForm

  def self.model_name
    ActiveModel::Name.new(self, nil, "Aktion")
  end

  validates :aktion_date, presence: true

  def initialize(attributes={})
    super
    aktion
    set_attributes(attributes)
  end

  def set_attributes(params)
    super
    params.slice(:body, :title, :teaser, :posted_at, :aktion_date, :country_id, :status).each do |param|
      aktion.attributes = {param[0] => param[1]}
    end if params
  end
end
