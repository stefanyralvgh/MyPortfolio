class CreateLevels < ActiveRecord::Migration[6.0]
  def change
    create_table :levels do |t|
      t.string :title, null: false
      t.text :description
      t.string :tech, array: true, default: []

      t.timestamps
    end
  end
end