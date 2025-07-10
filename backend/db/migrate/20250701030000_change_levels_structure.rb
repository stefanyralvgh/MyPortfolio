class ChangeLevelsStructure < ActiveRecord::Migration[7.1]
  def change
    remove_column :levels, :title, :string if column_exists?(:levels, :title)
    remove_column :levels, :description, :text if column_exists?(:levels, :description)
    remove_column :levels, :tech, :string, array: true, default: [] if column_exists?(:levels, :tech)
    remove_column :levels, :title_es, :string if column_exists?(:levels, :title_es)
    remove_column :levels, :title_en, :string if column_exists?(:levels, :title_en)
    remove_column :levels, :title_fr, :string if column_exists?(:levels, :title_fr)
    remove_column :levels, :description_es, :text if column_exists?(:levels, :description_es)
    remove_column :levels, :description_en, :text if column_exists?(:levels, :description_en)
    remove_column :levels, :description_fr, :text if column_exists?(:levels, :description_fr)

    add_column :levels, :titles, :jsonb, default: {}
    add_column :levels, :descriptions, :jsonb, default: {}
    add_column :levels, :question, :jsonb, default: {}
    add_column :levels, :options, :jsonb, default: {}
    add_column :levels, :correct_option, :string
    add_column :levels, :explanation, :jsonb, default: {}
  end
end 