class Admin::CvsController < AdminController
  def index
    profile = Profile.instance
    cvs_data = []
    
    ['es', 'en'].each do |lang|
      cv_blob = profile.cvs.find { |att| att.filename.to_s == "#{lang}_cv.pdf" }
      if cv_blob
        cvs_data << {
          language: lang,
          filename: cv_blob.filename.to_s,
          url: url_for(cv_blob),
          created_at: cv_blob.created_at,
          byte_size: cv_blob.byte_size
        }
      end
    end
    
    render json: { cvs: cvs_data }, status: :ok
  end

  def create
    language = params[:language] # 'es' or 'en'
    file = params[:file]

    unless file && language
      return render json: { error: 'File and language are required' }, status: :bad_request
    end

    unless ['es', 'en'].include?(language)
      return render json: { error: 'Language must be "es" or "en"' }, status: :bad_request
    end

    filename = "#{language}_cv.pdf"
    profile = Profile.instance

    # Remove old CV if exists
    old_cv = profile.cvs.find { |att| att.filename.to_s == filename }
    old_cv&.purge

    # Attach new CV
    profile.cvs.attach(
      io: file,
      filename: filename,
      content_type: 'application/pdf'
    )

    new_cv = profile.cvs.find { |att| att.filename.to_s == filename }
    
    render json: {
      message: 'CV uploaded successfully',
      language: language,
      filename: filename,
      url: url_for(new_cv),
      byte_size: new_cv.byte_size
    }, status: :created
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def destroy
    language = params[:id] || params[:language]

    unless ['es', 'en'].include?(language)
      return render json: { error: 'Language must be "es" or "en"' }, status: :bad_request
    end

    filename = "#{language}_cv.pdf"
    profile = Profile.instance
    cv = profile.cvs.find { |att| att.filename.to_s == filename }

    if cv
      cv.purge
      render json: { message: 'CV deleted successfully' }, status: :ok
    else
      render json: { error: 'CV not found' }, status: :not_found
    end
  end
end

