class Admin < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  def generate_token
    JwtService.encode({ admin_id: id })
  end
end

