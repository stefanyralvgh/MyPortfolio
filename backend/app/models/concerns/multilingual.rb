module Multilingual
  extend ActiveSupport::Concern

  included do
    validate :validate_multilingual_fields
  end

  private

  def validate_multilingual_fields
    required_languages = ['en', 'es', 'fr']
    
    multilingual_fields.each do |field|
      field_data = send(field)
      next if field_data.blank?
      
      required_languages.each do |lang|
        unless field_data.key?(lang)
          errors.add(field, "must include translation for #{lang}")
        end
      end
    end
  end

  # Override this method in the model to specify which fields are multilingual
  def multilingual_fields
    %w[title role tech description status link]
  end
end 