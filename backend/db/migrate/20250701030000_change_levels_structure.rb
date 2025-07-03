class ChangeLevelsStructure < ActiveRecord::Migration[7.1]
  def change
    remove_column :levels, :title, :string
    remove_column :levels, :description, :text
    remove_column :levels, :tech, :string, array: true, default: []
    remove_column :levels, :title_es, :string
    remove_column :levels, :title_en, :string
    remove_column :levels, :title_fr, :string
    remove_column :levels, :description_es, :text
    remove_column :levels, :description_en, :text
    remove_column :levels, :description_fr, :text

    add_column :levels, :titles, :jsonb, default: {}
    add_column :levels, :descriptions, :jsonb, default: {}
    add_column :levels, :question, :jsonb, default: {}
    add_column :levels, :options, :jsonb, default: {}
    add_column :levels, :correct_option, :string
    add_column :levels, :explanation, :jsonb, default: {}
  end
end 