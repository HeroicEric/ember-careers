require 'spec_helper'

describe JobSerializer do
  describe "#can_edit" do
    context "when job belongs to current user" do
      it "can be edited" do
        job = FactoryGirl.build(:job)
        user = job.user

        serializer = JobSerializer.new(job, scope: user)

        expect(serializer.can_edit).to eq true
      end
    end

    context "when job does not belong to current user" do
      it "cannot be edited" do
        job = FactoryGirl.build(:job)
        user = FactoryGirl.build(:user)

        serializer = JobSerializer.new(job, scope: user)

        expect(serializer.can_edit).to eq false
      end
    end
  end
end
