# class AdminController < ApplicationController
#   before_action :authenticate_admin!, except: [:create]

#   private

#   def authenticate_admin!
#     token = request.headers['Authorization']&.split(' ')&.last
#     decoded_token = JwtService.decode(token)

#     if decoded_token && decoded_token[:admin_id]
#       @current_admin = Admin.find_by(id: decoded_token[:admin_id])
#     end

#     render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_admin
#   end

#   def current_admin
#     @current_admin
#   end
# end

class AdminController < ApplicationController
  before_action :authenticate_admin!

  private

  def authenticate_admin!
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = JwtService.decode(token)

    if decoded_token && decoded_token[:admin_id]
      @current_admin = Admin.find_by(id: decoded_token[:admin_id])
    end

    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_admin
  end

  def current_admin
    @current_admin
  end
end
