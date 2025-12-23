# class Admin::SessionsController < ApplicationController
#   def create
#     admin = Admin.find_by(email: params[:email])

#     if admin&.authenticate(params[:password])
#       token = admin.generate_token
#       render json: {
#         admin: {
#           id: admin.id,
#           email: admin.email
#         },
#         token: token
#       }, status: :ok
#     else
#       render json: { error: 'Invalid email or password' }, status: :unauthorized
#     end
#   end

#   def show
#     token = request.headers['Authorization']&.split(' ')&.last
#     decoded_token = JwtService.decode(token)

#     if decoded_token && decoded_token[:admin_id]
#       admin = Admin.find_by(id: decoded_token[:admin_id])
#       if admin
#         render json: {
#           admin: {
#             id: admin.id,
#             email: admin.email
#           }
#         }, status: :ok
#       else
#         render json: { error: 'Admin not found' }, status: :not_found
#       end
#     else
#       render json: { error: 'Invalid token' }, status: :unauthorized
#     end
#   end
# end

class Admin::SessionsController < ApplicationController
  def create
    admin = Admin.find_by(email: params[:email])

    if admin&.authenticate(params[:password])
      token = admin.generate_token

      render json: {
        admin: {
          id: admin.id,
          email: admin.email
        },
        token: token
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def show
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = JwtService.decode(token)

    if decoded_token && decoded_token[:admin_id]
      admin = Admin.find_by(id: decoded_token[:admin_id])

      return render json: { error: 'Admin not found' }, status: :not_found unless admin

      render json: {
        admin: {
          id: admin.id,
          email: admin.email
        }
      }, status: :ok
    else
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
end
