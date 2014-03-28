class JobSerializer < ActiveModel::Serializer
  attributes :id,
    :title,
    :company,
    :category,
    :location,
    :description

  def category
    object.category.capitalize
  end
end
