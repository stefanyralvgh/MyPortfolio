class Project < ApplicationRecord
  include Multilingual
  include Timestampable
  include Searchable

  validates :title, presence: true
  validates :role, presence: true
  validates :tech, presence: true
  validates :description, presence: true
  validates :status, presence: true
  validates :link, presence: true


  scope :by_status, ->(status) { where("status->>'en' = ?", status) }
  scope :by_tech, ->(tech) { where("tech::text ILIKE ?", "%#{tech}%") }
  

  def display_title(language = 'en')
    title[language] || title['en'] || 'Title not available'
  end

  def display_description(language = 'en')
    description[language] || description['en'] || 'Description not available'
  end

  def display_role(language = 'en')
    role[language] || role['en'] || 'Role not available'
  end

  def display_tech(language = 'en')
    tech[language] || tech['en'] || 'Tech not available'
  end

  def display_status(language = 'en')
    status[language] || status['en'] || 'Status not available'
  end

  def display_link(language = 'en')
    link[language] || link['en'] || 'Link not available'
  end
end 