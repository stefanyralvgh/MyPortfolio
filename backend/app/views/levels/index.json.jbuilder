json.array! do
  Level.all.each do |level|
    json.id level.id
    json.title level.title
    json.description level.description
    json.tech level.tech
  end
end