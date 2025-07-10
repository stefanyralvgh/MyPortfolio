class Level < ApplicationRecord
  include Timestampable
  include Searchable

  validates :titles, presence: true
  validates :descriptions, presence: true
  validates :question, presence: true
  validates :options, presence: true
  validates :correct_option, presence: true, inclusion: { in: %w[A B] }
  validates :explanation, presence: true

 
  scope :by_difficulty, ->(difficulty) { where(difficulty: difficulty) }
  scope :easy, -> { where(difficulty: 'easy') }
  scope :medium, -> { where(difficulty: 'medium') }
  scope :hard, -> { where(difficulty: 'hard') }


  def display_title(language = 'en')
    titles[language] || titles['en'] || 'Title not available'
  end

  def display_description(language = 'en')
    descriptions[language] || descriptions['en'] || 'Description not available'
  end

  def display_question(language = 'en')
    question[language] || question['en'] || 'Question not available'
  end

  def display_options(language = 'en')
    options.transform_values { |option| option[language] || option['en'] || 'Option not available' }
  end

  def display_explanation(language = 'en')
    explanation[language] || explanation['en'] || 'Explanation not available'
  end

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

  private

  def searchable_fields
    # Fields specific to Level model
    %w[titles descriptions question explanation]
  end
end