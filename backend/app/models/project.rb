class Project < ApplicationRecord
  validates :title, presence: true
  validates :role, presence: true
  validates :tech, presence: true
  validates :description, presence: true
  validates :status, presence: true
  validates :link, presence: true

  # Validar que los campos JSONB tengan las claves de idioma requeridas
  validate :validate_multilingual_fields

  private

  def validate_multilingual_fields
    required_languages = ['en', 'es', 'fr']
    
    %w[title role tech description status link].each do |field|
      field_data = send(field)
      next if field_data.blank?
      
      required_languages.each do |lang|
        unless field_data.key?(lang)
          errors.add(field, "must include translation for #{lang}")
        end
      end
    end
  end
end 