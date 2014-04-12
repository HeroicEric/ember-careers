class Api::V1::JobsController < Api::V1::BaseController
  respond_to :json

  before_action :ensure_valid_access_token!, only: [:create, :update, :destroy]

  def index
    render json: Job.chronological
  end

  def show
    render json: Job.find(params[:id])
  end

  def create
    @job = current_user.jobs.build(job_params)

    if @job.save
      render json: @job, status: :created, location: [:api, :v1, @job]
    else
      render json: { errors: @job.errors }, status: :unprocessable_entity
    end
  end

  def update
    @job = current_user.jobs.find(params[:id])

    if @job.update(job_params)
      render json: @job, status: :ok, location: [:api, :v1, @job]
    else
      render json: { errors: @job.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @job = current_user.jobs.find(params[:id])
    @job.destroy

    head :no_content
  end

  private
  def job_params
    params.require(:job).permit(:title, :description, :company, :location, :category)
  end
end
