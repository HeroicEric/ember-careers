require 'spec_helper'

describe Api::V1::JobsController do
  describe "GET #index" do
    it "returns all the jobs" do
      jobs = FactoryGirl.build_stubbed_list(:job, 3)
      Job.stub(:all) { jobs }

      get :index

      expect(json).to be_json_eq ActiveModel::ArraySerializer.new(jobs, root: :jobs)
    end
  end

  describe "GET #show" do
    it "returns a job" do
      job = FactoryGirl.build_stubbed(:job)
      Job.stub(:find).with(job.id.to_s) { job }

      get :show, id: job.id

      expect(json).to be_json_eq JobSerializer.new(job)
    end
  end

  describe "POST #create" do
    context "with valid access token" do
      before do
        user = FactoryGirl.create(:user)
        mock_access_token_for(user)
      end

      context "with valid attributes" do
        it "creates a new job" do
          expect(Job.count).to eq 0

          post :create, job: {
            title: 'Senior Developer',
            description: 'Build awesome ember apps',
            company: 'Embros Inc.',
            location: 'Portland, OR',
            category: 'full-time'
          }

          expect(Job.count).to eq 1
          expect(response.status).to eq 201
          expect(json).to be_json_eq JobSerializer.new(Job.first)
        end
      end

      context "with invalid attributes" do
        it "is not successful" do
          post :create, job: { invalid: '' }

          expect(response.status).to eq 422
        end
      end
    end

    context "without valid access token" do
      it "is unauthorized" do
        post :create

        expect(response.status).to eq 401
      end
    end
  end

  describe "PUT #update" do
    context "with valid access token" do
      before do
        user = FactoryGirl.create(:user)
        mock_access_token_for(user)
      end

      context "with valid attributes" do
        it "creates a new job" do
          expect(Job.count).to eq 0

          post :create, job: {
            title: 'Senior Developer',
            description: 'Build awesome ember apps',
            company: 'Embros Inc.',
            location: 'Portland, OR',
            category: 'full-time'
          }

          expect(Job.count).to eq 1
          expect(response.status).to eq 201
          expect(json).to be_json_eq JobSerializer.new(Job.first)
        end
      end
    end
  end
end
