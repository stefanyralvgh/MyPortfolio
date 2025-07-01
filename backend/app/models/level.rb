class Level < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :tech, presence: true

  def self.unlock_level(level_id)
    find(level_id)
  end
end