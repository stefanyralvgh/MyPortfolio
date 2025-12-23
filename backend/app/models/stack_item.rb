class StackItem < ApplicationRecord
    include Timestampable
  
    CATEGORIES = %w[main familiar tools].freeze
    LEVELS = %w[Advanced Intermediate Basic].freeze
  
    validates :name, presence: true
    validates :icon, presence: true
    validates :category, presence: true, inclusion: { in: CATEGORIES }
    validates :level, inclusion: { in: LEVELS }, if: -> { category.in?(%w[main familiar]) }
  
    scope :main, -> { where(category: 'main').order(:position) }
    scope :familiar, -> { where(category: 'familiar').order(:position) }
    scope :tools, -> { where(category: 'tools').order(:position) }
    scope :ordered, -> { order(:position) }
  
    def self.by_category(category)
      where(category: category).order(:position)
    end
  end