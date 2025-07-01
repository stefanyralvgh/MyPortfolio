class LevelsController < ApplicationController
  def index
    language = params[:language] || 'es'
    levels = Level.all
    render json: levels.map { |level| level.as_json(language: language) }
  end

  def show
    language = params[:language] || 'es'
    level = Level.find(params[:id])
    render json: level.as_json(language: language)
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
      :title, :description, :tech,
      :title_es, :title_en, :title_fr,
      :description_es, :description_en, :description_fr
    )
  end
end