module MainModelsModifiers
  def to_param
    return "#{id}-#{title.parameterize}" if respond_to?(:title) && title.present?
    return "#{id}-#{name.parameterize}" if respond_to?(:name) && name.present?
    id.to_s
  end
end
