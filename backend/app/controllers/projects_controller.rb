class ProjectsController < ApplicationController
  def index
    language = params[:language] || 'en'
    projects = Project.all
    
    Rails.logger.info "Projects found: #{projects.count}"
    Rails.logger.info "Language requested: #{language}"
    
    result = projects.map do |project|
      {
        id: project.id,
        title: project.title[language] || project.title['en'] || 'Title not available',
        role: project.role[language] || project.role['en'] || 'Role not available',
        tech: project.tech[language] || project.tech['en'] || 'Tech not available',
        description: project.description[language] || project.description['en'] || 'Description not available',
        status: project.status[language] || project.status['en'] || 'Status not available',
        link: project.link[language] || project.link['en'] || 'Link not available',
        created_at: project.created_at,
        updated_at: project.updated_at
      }
    end
    
    Rails.logger.info "First project data: #{result.first.inspect}" if result.any?
    
    render json: result
  end
end 