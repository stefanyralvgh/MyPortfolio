# class Admin::LevelsController < AdminController
#   def index
#     levels = Level.all.order(:id)
#     render json: levels, status: :ok
#   end

#   def show
#     level = Level.find(params[:id])
#     render json: level, status: :ok
#   rescue ActiveRecord::RecordNotFound
#     render json: { error: 'Level not found' }, status: :not_found
#   end

#   def create
#     level = Level.new(level_params)
#     if level.save
#       render json: level, status: :created
#     else
#       render json: { errors: level.errors.full_messages }, status: :unprocessable_entity
#     end
#   end

#   def update
#     level = Level.find(params[:id])
#     if level.update(level_params)
#       render json: level, status: :ok
#     else
#       render json: { errors: level.errors.full_messages }, status: :unprocessable_entity
#     end
#   rescue ActiveRecord::RecordNotFound
#     render json: { error: 'Level not found' }, status: :not_found
#   end

#   def destroy
#     level = Level.find(params[:id])
#     level.destroy
#     render json: { message: 'Level deleted successfully' }, status: :ok
#   rescue ActiveRecord::RecordNotFound
#     render json: { error: 'Level not found' }, status: :not_found
#   end

#   private

#   def level_params
#     params.require(:level).permit(
#       :titles,
#       :descriptions,
#       :question,
#       :options,
#       :correct_option,
#       :explanation
#     )
#   end
# end

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
    # 👇 Parsear campos JSON antes de crear
    parsed_params = parse_json_fields(level_params)
    
    level = Level.new(parsed_params)
    if level.save
      render json: level, status: :created
    else
      render json: { errors: level.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    level = Level.find(params[:id])
    
    # 👇 Parsear campos JSON antes de actualizar
    parsed_params = parse_json_fields(level_params)
    
    if level.update(parsed_params)
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

  # 👇 Método para parsear campos JSON
  def parse_json_fields(params)
    json_fields = [:titles, :descriptions, :question, :options, :explanation]
    
    parsed = params.to_h
    json_fields.each do |field|
      if parsed[field].is_a?(String)
        begin
          parsed[field] = JSON.parse(parsed[field])
        rescue JSON::ParserError => e
          Rails.logger.error "Error parsing JSON for #{field}: #{e.message}"
          # Si no es JSON válido, dejarlo como está
        end
      end
    end
    
    parsed
  end
end