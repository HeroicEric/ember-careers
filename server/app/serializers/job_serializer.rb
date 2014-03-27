class JobSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :category,
    :company,
    :description,
    :location,
    :title

  def category
    object.category.capitalize
  end
end
