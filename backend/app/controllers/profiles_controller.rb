class ProfilesController < ApplicationController
  def show
    profile = Profile.instance
    
    es_cv = profile.cvs.find { |att| att.filename.to_s == 'es_cv.pdf' }
    en_cv = profile.cvs.find { |att| att.filename.to_s == 'en_cv.pdf' }
    
    render json: profile.as_json.merge(
      photo_url: profile.photo.attached? ? url_for(profile.photo) : nil,
      cv_urls: {
        es: es_cv ? url_for(es_cv) : nil,
        en: en_cv ? url_for(en_cv) : nil
      }
    ), status: :ok
  end
end

