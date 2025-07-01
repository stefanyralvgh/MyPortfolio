class Level < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :tech, presence: true

  # Add language support
  validates :title_es, presence: true
  validates :title_en, presence: true
  validates :title_fr, presence: true
  validates :description_es, presence: true
  validates :description_en, presence: true
  validates :description_fr, presence: true

  def self.unlock_level(level_id)
    find(level_id)
  end

  def title_for_language(lang)
    case lang
    when 'es'
      title_es || title
    when 'en'
      title_en || title
    when 'fr'
      title_fr || title
    else
      title
    end
  end

  def description_for_language(lang)
    case lang
    when 'es'
      description_es || description
    when 'en'
      description_en || description
    when 'fr'
      description_fr || description
    else
      description
    end
  end

  def as_json(options = {})
    lang = options[:language] || 'es'
    super(options).merge({
      'title' => title_for_language(lang),
      'description' => description_for_language(lang)
    })
  end
end