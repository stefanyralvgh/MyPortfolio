class Admin::LevelsController < AdminController
  def index
    levels = Level.all.order(:id)
    render json: levels, status: :ok
  end

  def show
    level = Level.find(params[:id])
    render json: level, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Level not found' }, status: :not_found
  end

  def create
    level = Level.new(level_params)
    if level.save
      render json: level, status: :created
    else
      render json: { errors: level.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    level = Level.find(params[:id])
    if level.update(level_params)
      render json: level, status: :ok
    else
      render json: { errors: level.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Level not found' }, status: :not_found
  end

  def destroy
    level = Level.find(params[:id])
    level.destroy
    render json: { message: 'Level deleted successfully' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Level not found' }, status: :not_found
  end

  private

  def level_params
    params.require(:level).permit(
      :titles,
      :descriptions,
      :question,
      :options,
      :correct_option,
      :explanation
    )
  end
end

