# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "user#{n}name" }
    email { "#{username}@aol.com" }
    provider "github"
    sequence(:uid) { |n| n.to_s }
  end
end
