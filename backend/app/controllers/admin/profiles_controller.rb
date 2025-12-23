class Admin::ProfilesController < AdminController
  def show
    profile = Profile.instance
    render json: profile.as_json.merge(
      photo_url: profile.photo.attached? ? url_for(profile.photo) : nil
    ), status: :ok
  end

  def update
    profile = Profile.instance
    
    if profile.update(profile_params)
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
      :quick_stats
    )
  end
end

