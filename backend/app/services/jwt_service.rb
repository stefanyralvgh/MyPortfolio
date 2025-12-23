class JwtService
  SECRET_KEY = Rails.application.credentials.secret_key_base || Rails.application.secret_key_base
  ALGORITHM = 'HS256'
  EXPIRATION_TIME = 24.hours.to_i

  def self.encode(payload, exp = Time.now.to_i + EXPIRATION_TIME)
    payload[:exp] = exp
    JWT.encode(payload, SECRET_KEY, ALGORITHM)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: ALGORITHM })
    HashWithIndifferentAccess.new(decoded[0])
  rescue JWT::DecodeError, JWT::ExpiredSignature => e
    nil
  end
end

