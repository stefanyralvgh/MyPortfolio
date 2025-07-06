module Timestampable
  extend ActiveSupport::Concern

  included do
    scope :recent, -> { order(created_at: :desc) }
    scope :recently_updated, -> { order(updated_at: :desc) }
  end

  def days_since_creation
    (Time.current - created_at) / 1.day
  end

  def days_since_update
    (Time.current - updated_at) / 1.day
  end

  def recently_created?(days = 7)
    days_since_creation <= days
  end

  def recently_updated?(days = 7)
    days_since_update <= days
  end
end 