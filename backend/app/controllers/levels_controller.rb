class LevelsController < ApplicationController
  def index
    language = params[:language] || 'en'
    levels = Level.order(:id)
    
    Rails.logger.info "Levels found: #{levels.count}"
    Rails.logger.info "Language requested: #{language}"
    
    result = levels.map do |level|
      {
        id: level.id,
        titles: level.titles[language] || level.titles['en'] || 'Title not available',
        descriptions: level.descriptions[language] || level.descriptions['en'] || 'Description not available',
        question: level.question[language] || level.question['en'] || 'Question not available',
        options: level.options[language] || level.options['en'] || {},
        correct_option: level.correct_option,
        explanation: level.explanation[language] || level.explanation['en'] || 'Explanation not available'
      }
    end
    
    Rails.logger.info "First level data: #{result.first.inspect}" if result.any?
    
    render json: result
  end

  def show
    language = params[:language] || 'en'
    level = Level.find(params[:id])
    
    result = {
      id: level.id,
      titles: level.titles[language] || level.titles['en'] || 'Title not available',
      descriptions: level.descriptions[language] || level.descriptions['en'] || 'Description not available',
      question: level.question[language] || level.question['en'] || 'Question not available',
      options: level.options[language] || level.options['en'] || {},
      correct_option: level.correct_option,
      explanation: level.explanation[language] || level.explanation['en'] || 'Explanation not available'
    }
    
    render json: result
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