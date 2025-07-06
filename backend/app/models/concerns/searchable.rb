module Searchable
  extend ActiveSupport::Concern

  included do
    scope :search_by_language, ->(query, language = 'en') { 
      where("title->>? ILIKE ? OR description->>? ILIKE ? OR tech->>? ILIKE ?", 
            language, "%#{query}%", language, "%#{query}%", language, "%#{query}%") 
    }
    
    scope :search_all_languages, ->(query) {
      where("title::text ILIKE ? OR description::text ILIKE ? OR tech::text ILIKE ?", 
            "%#{query}%", "%#{query}%", "%#{query}%")
    }
  end

  def search_in_field(field, query, language = 'en')
    field_data = send(field)
    return false unless field_data.is_a?(Hash)
    
    field_data[language]&.downcase&.include?(query.downcase)
  end

  def matches_search?(query, language = 'en')
    searchable_fields.any? { |field| search_in_field(field, query, language) }
  end

  private

  def searchable_fields
    %w[title description role tech]
  end
end 