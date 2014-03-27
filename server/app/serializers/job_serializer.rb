class JobSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :title, :company, :description
end
