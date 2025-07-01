# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create sample levels for the interactive portfolio
Level.find_or_create_by!(title: "Frontend Basics") do |level|
  level.description = "Learn the fundamentals of HTML, CSS, and JavaScript"
  level.tech = ["HTML", "CSS", "JavaScript"]
end

Level.find_or_create_by!(title: "React Development") do |level|
  level.description = "Build modern web applications with React"
  level.tech = ["React", "JavaScript", "JSX"]
end

Level.find_or_create_by!(title: "Backend with Rails") do |level|
  level.description = "Create robust APIs with Ruby on Rails"
  level.tech = ["Ruby", "Rails", "PostgreSQL"]
end

Level.find_or_create_by!(title: "Full Stack Integration") do |level|
  level.description = "Connect frontend and backend applications"
  level.tech = ["React", "Rails", "API", "JSON"]
end
