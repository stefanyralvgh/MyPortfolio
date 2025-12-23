class Admin::ProjectsController < AdminController
  def index
    projects = Project.all.order(created_at: :desc)
    render json: projects, status: :ok
  end

  def show
    project = Project.find(params[:id])
    render json: project, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  def create
    project = Project.new(project_params)
    if project.save
      render json: project, status: :created
    else
      render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    project = Project.find(params[:id])
    if project.update(project_params)
      render json: project, status: :ok
    else
      render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  def destroy
    project = Project.find(params[:id])
    project.destroy
    render json: { message: 'Project deleted successfully' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  private

  def project_params
    params.require(:project).permit(
      title: {},
      role: {},
      tech: {},
      description: {},
      status: {},
      link: {}
    )
  end
end

