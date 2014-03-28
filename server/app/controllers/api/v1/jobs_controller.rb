class Api::V1::JobsController < ApplicationController
  respond_to :json

  def index
    render json: Job.all
  end

  def show
    render json: Job.find(params[:id])
  end

  def create
    @job = Job.new(job_params)

    if @job.save
      render json: @job, status: :created, location: [:api, :v1, @job]
    else
      render json: { errors: @job.errors }, status: :unprocessable_entity
    end
  end

  private
  def job_params
    params.require(:job).permit(:title, :description, :company, :location, :category)
  end
end
