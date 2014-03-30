FactoryGirl.define do
  sequence(:uid) { |n| "abc#{n}123" }

  factory :github_auth_hash, class: OmniAuth::AuthHash do
    ignore do
      sequence(:email) { |n| "foo#{n}@example.com" }
      sequence(:name) { |n| "Er#{n}c Sheehan" }
      sequence(:nickname) { |n| "user#{n}" }
    end

    provider 'github'
    uid

    info do
      {
        name: name,
        email: email,
        nickname: nickname
      }
    end
  end
end
