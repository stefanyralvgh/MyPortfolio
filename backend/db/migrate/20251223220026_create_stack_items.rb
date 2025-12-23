class CreateStackItems < ActiveRecord::Migration[7.1]
  def change
    create_table :stack_items do |t|
      t.string :name, null: false
      t.string :icon, null: false
      t.string :category, null: false # 'main', 'familiar', 'tools'
      t.string :level # 'Advanced', 'Intermediate', 'Basic' - solo para main y familiar
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :stack_items, :category
    add_index :stack_items, :position
  end
end