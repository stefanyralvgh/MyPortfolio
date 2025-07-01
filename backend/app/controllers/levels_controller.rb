class LevelsController < ApplicationController
  def index
    levels = Level.all
    render json: levels
  end

  def show
    level = Level.find(params[:id])
    render json: level
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
    params.require(:level).permit(:title, :description, :tech)
  end
end