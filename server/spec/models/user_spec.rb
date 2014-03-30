require 'spec_helper'

describe User do
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
    context "when user doesn't have an auth token" do
      it "sets an auth token" do
        user = FactoryGirl.build(:user, auth_token: nil)
        user.save

        expect(user.auth_token).to_not eq nil
      end
    end

    context "when user already has an auth token" do
      it "doesn't change the auth token" do
        user = FactoryGirl.create(:user)
        token = user.auth_token

        user.save

        expect(user.auth_token).to eq token
      end
    end
  end

  describe ".find_or_create_from_omniauth" do
    let(:auth_hash) { FactoryGirl.create(:github_auth_hash) }

    describe "user already exists" do
      it "returns the User with matching attributes" do
        existing_user = FactoryGirl.create(:user,
          provider: auth_hash.provider,
          uid: auth_hash.uid)
        user = User.find_or_create_from_omniauth(auth_hash)

        expect(user).to eq existing_user
      end
    end

    describe "user does not already exist" do
      it "creates a new User with the correct attributes" do
        user = User.find_or_create_from_omniauth(auth_hash)

        expect(user.provider).to eq auth_hash.provider
        expect(user.uid).to eq auth_hash.uid
      end
    end
  end
end
