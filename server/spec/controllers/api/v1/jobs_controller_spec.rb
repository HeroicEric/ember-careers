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
      let!(:user) { FactoryGirl.create(:user) }

      before do
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
          expect(json).to be_json_eq JobSerializer.new(Job.first, scope: user)
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
      let!(:user) { FactoryGirl.create(:user) }

      before do
        mock_access_token_for(user)
      end

      context "when job belongs to current user" do
        context "with valid attributes" do
          it "updates the job" do
            job = FactoryGirl.create(:job, user: user, company: "Fast Company")
            expect(Job.count).to eq 1

            put :update, id: job.id, job: { company: 'Trollcat' }

            job.reload
            expect(Job.count).to eq 1
            expect(response.status).to eq 200
            expect(json).to be_json_eq JobSerializer.new(job, scope: user)
            expect(job.company).to eq 'Trollcat'
          end
        end

        context "with invalid attributes" do
          it "is not successful" do
            job = FactoryGirl.create(:job, user: user, company: "Fast Company")

            put :update, id: job.id, job: { title: '' }

            expect(response.status).to eq 422
          end
        end
      end

      context "when job belongs to another user" do
        it "doesn't update the job" do
          job = FactoryGirl.create(:job)

          expect {
            put :update, id: job.id, job: { company: 'Trollcat' }
          }.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end

    context "without valid access token" do
      it "is unauthorized" do
        put :update, id: 'anything'

        expect(response.status).to eq 401
      end
    end
  end

  describe "DELETE #destroy" do
    context "with valid access token" do
      let!(:user) { FactoryGirl.create(:user) }

      before do
        mock_access_token_for(user)
      end

      context "when job belongs to current user" do
        it "destroys the job" do
          job = FactoryGirl.create(:job, user: user, company: "Fast Company")
          expect(Job.count).to eq 1

          delete :destroy, id: job.id

          expect(Job.count).to eq 0
          expect(response.status).to eq 204
        end
      end

      context "when job belongs to another user" do
        it "doesn't destroy the job" do
          job = FactoryGirl.create(:job)

          expect {
            delete :destroy, id: job.id
          }.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end

    context "without valid access token" do
      it "is unauthorized" do
        delete :destroy, id: 'anything'

        expect(response.status).to eq 401
      end
    end
  end
end
