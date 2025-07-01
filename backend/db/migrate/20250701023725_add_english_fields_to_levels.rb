class AddEnglishFieldsToLevels < ActiveRecord::Migration[7.1]
  def change
    add_column :levels, :title_en, :string
    add_column :levels, :description_en, :text
  end
end
