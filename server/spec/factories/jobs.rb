# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :job do
    title { ['Senior Developer', 'Junior Developer', 'Ember Intern', 'Ember Ninja', 'Ember Wizard'].sample }
    sequence(:description) { |n| "Really awesome #{n} description of this job." }
    sequence(:company) { |n| "Cool #{n} Company" }
    location { ['New York, NY', 'Portland, OR', 'Boston, MA', 'San Francisco, CA'].sample }
    category { ['full-time', 'part-time', 'contract', 'internship'].sample }
  end
end
