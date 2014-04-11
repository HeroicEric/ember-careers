class JobSerializer < ActiveModel::Serializer
  attributes :id,
    :can_edit,
    :category,
    :company,
    :description,
    :location,
    :title

  def category
    object.category.capitalize
  end

  def can_edit
    object.user == scope
  end
end
