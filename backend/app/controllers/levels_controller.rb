class LevelsController < ApplicationController
  def index
    render json: Level.all
  end

  def show
    render json: Level.find(params[:id])
  end

  def create
    level = Level.new(level_params)
    if level.save
      render json: level, status: :created
    else
      render json: level.errors, status: :unprocessable_entity
    end
  end

  private

  def level_params
    params.require(:level).permit(
      :titles, :descriptions, :question, :options, :correct_option, :explanation
    )
  end
end