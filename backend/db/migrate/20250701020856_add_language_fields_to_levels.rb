class AddLanguageFieldsToLevels < ActiveRecord::Migration[7.1]
  def change
    add_column :levels, :title_es, :string
    add_column :levels, :description_es, :text
    add_column :levels, :title_fr, :string
    add_column :levels, :description_fr, :text
    add_column :levels, :title_en, :string
    add_column :levels, :description_en, :text
  end
end
