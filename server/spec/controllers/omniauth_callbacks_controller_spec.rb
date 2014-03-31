require 'spec_helper'
require 'json'

describe OmniauthCallbacksController do
  describe "GET #success" do
    context "with valid omniauth credentials" do
      before do
        request.env['omniauth.auth'] = FactoryGirl.create(:github_auth_hash)
        get :success, provider: 'github'
      end

      it "is successful" do
        expect(response).to be_success
      end

      describe "assigned data" do
        let(:assigned_data) do
          JSON.parse(assigns(:data))
        end

        it "has the success status" do
          expect(assigned_data['status']).to eq 'success'
        end

        it "has the correct token type" do
          expect(assigned_data['token_type']).to eq 'bearer'
        end

        it "has an access token" do
          expect(assigned_data['access_token']).to_not eq nil
        end
      end
    end
  end

  describe "GET #failure" do
    describe "assigned data" do
      before { get :failure }

      let(:assigned_data) { JSON.parse(assigns(:data)) }

      it "has the failure status" do
        expect(assigned_data['status']).to eq 'failure'
      end

      it "has a error message" do
        error = 'There was an issue authenticating your account.'
        expect(assigned_data['error']).to eq error
      end
    end
  end
end
