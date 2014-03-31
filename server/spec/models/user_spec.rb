require 'spec_helper'

describe User do
  describe "associations" do
    it { should have_many :jobs }
  end

  describe "validations" do
    before { FactoryGirl.create(:user) }

    describe "#email" do
      it { should validate_presence_of :email }
      it { should validate_uniqueness_of(:email) }
    end

    describe "#provider" do
      it { should validate_presence_of :provider }
      it { should have_valid(:provider).when('github') }
      it { should_not have_valid(:provider).when('anything', 'else') }
    end

    describe "#uid" do
      it { should validate_presence_of :uid }
      it { should validate_uniqueness_of(:uid).scoped_to(:provider) }
    end

    describe "#username" do
      it { should validate_presence_of :username }
      it { should validate_uniqueness_of(:username) }
    end
  end

  describe "#save" do
    context "when user doesn't have an access token" do
      it "sets an access token" do
        user = FactoryGirl.build(:user, access_token: nil)
        user.save

        expect(user.access_token).to_not eq nil
      end
    end

    context "when user already has an access token" do
      it "doesn't change the access token" do
        user = FactoryGirl.create(:user)
        token = user.access_token

        user.save

        expect(user.access_token).to eq token
      end
    end
  end

  describe ".find_or_create_from_omniauth" do
    let(:access_hash) { FactoryGirl.create(:github_auth_hash) }

    describe "user already exists" do
      it "returns the User with matching attributes" do
        existing_user = FactoryGirl.create(:user,
          provider: access_hash.provider,
          uid: access_hash.uid)
        user = User.find_or_create_from_omniauth(access_hash)

        expect(user).to eq existing_user
      end
    end

    describe "user does not already exist" do
      it "creates a new User with the correct attributes" do
        user = User.find_or_create_from_omniauth(access_hash)

        expect(user.provider).to eq access_hash.provider
        expect(user.uid).to eq access_hash.uid
      end
    end
  end
end
