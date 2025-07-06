class Level < ApplicationRecord
  include Timestampable
  include Searchable

  validates :title, presence: true
  validates :description, presence: true
  validates :difficulty, presence: true, inclusion: { in: %w[easy medium hard] }

  # Scopes específicos para niveles
  scope :by_difficulty, ->(difficulty) { where(difficulty: difficulty) }
  scope :easy, -> { where(difficulty: 'easy') }
  scope :medium, -> { where(difficulty: 'medium') }
  scope :hard, -> { where(difficulty: 'hard') }

  # Métodos específicos para niveles
  def completed?
    completed_at.present?
  end

  def mark_as_completed!
    update!(completed_at: Time.current)
  end

  def time_to_complete
    return nil unless completed_at && created_at
    (completed_at - created_at) / 1.minute
  end
end