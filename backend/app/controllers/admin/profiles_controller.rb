class Admin::ProfilesController < AdminController
  def show
    profile = Profile.instance
    render json: profile.as_json.merge(
      photo_url: profile.photo.attached? ? url_for(profile.photo) : nil
    ), status: :ok
  end

  def update
    profile = Profile.instance
    
    # Parse JSON fields before updating
    parsed_params = parse_json_fields(profile_params)
    
    if profile.update(parsed_params)
      # Handle photo upload
      if params[:profile][:photo]
        profile.photo.attach(params[:profile][:photo])
      end

      render json: profile.as_json.merge(
        photo_url: profile.photo.attached? ? url_for(profile.photo) : nil
      ), status: :ok
    else
      render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(
      :name,
      :subtitle,
      :bio,
      :story,
      :why,
      :personality,
      :values,
      :fun_facts,
      :social_links,
      :main_stack,
      :familiar,
      :recruiter_projects,
      :quick_stats,
      :photo
    )
  end

  def parse_json_fields(params)
    json_fields = [:name, :subtitle, :bio, :story, :why, :personality, :values, :fun_facts, :social_links, :main_stack, :familiar, :recruiter_projects, :quick_stats]
    
    parsed = params.to_h
    json_fields.each do |field|
      if parsed[field].is_a?(String)
        begin
          parsed[field] = JSON.parse(parsed[field])
        rescue JSON::ParserError
          # Si no es JSON válido, dejarlo como está
        end
      end
    end
    
    parsed
  end
end