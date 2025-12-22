# class Profile < ApplicationRecord
#   include Multilingual
#   include Timestampable

#   has_one_attached :photo
#   has_many_attached :cvs

#   # Ensure only one profile exists
#   def self.instance
#     first_or_create!
#   end

#   def display_name(language = 'en')
#     name[language] || name['en'] || 'Name not available'
#   end

#   def display_subtitle(language = 'en')
#     subtitle[language] || subtitle['en'] || 'Subtitle not available'
#   end

#   def display_bio(language = 'en')
#     bio[language] || bio['en'] || 'Bio not available'
#   end

# end


class Profile < ApplicationRecord
  include Multilingual
  include Timestampable

  multilingual_fields(
    :name,
    :subtitle,
    :bio,
    :story,
    :why,
    :personality,
    :values,
    :fun_facts
  )

  has_one_attached :photo
  has_many_attached :cvs

  # Ensure only one profile exists
  def self.instance
    first_or_create!
  end
end
