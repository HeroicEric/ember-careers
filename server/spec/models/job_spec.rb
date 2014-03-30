require 'spec_helper'

describe Job do
  describe "associations" do
    it { should belong_to :user }
  end

  it { should validate_presence_of :user }

  it { should have_valid(:title).when('Senior Dev', 'Ember Wizard Ninja') }
  it { should_not have_valid(:title).when(nil, '') }

  it { should have_valid(:description).when('word ' * 200) }
  it { should_not have_valid(:description).when(nil, '') }

  it { should have_valid(:company).when('GitHub', 'Tilde', 'Launch Academy') }
  it { should_not have_valid(:company).when(nil, '') }

  it { should have_valid(:location).when('Portland, OR', 'Boston, MA', 'Wyoming') }
  it { should_not have_valid(:location).when(nil, '') }

  it { should have_valid(:category).when('full-time', 'part-time', 'contract', 'internship') }
  it { should_not have_valid(:category).when(nil, '', 'Anything', 'else') }

  describe "#category=" do
    it "downcases given value" do
      job = Job.new(category: "Full-Time")
      expect(job.category).to eq 'full-time'
    end
  end
end
