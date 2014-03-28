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
end
