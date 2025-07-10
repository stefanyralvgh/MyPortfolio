class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.jsonb :title, null: false, default: {}
      t.jsonb :role, null: false, default: {}
      t.jsonb :tech, null: false, default: {}
      t.jsonb :description, null: false, default: {}
      t.jsonb :status, null: false, default: {}
      t.jsonb :link, null: false, default: {}

      t.timestamps
    end

    add_index :projects, :title, using: :gin
    add_index :projects, :role, using: :gin
    add_index :projects, :tech, using: :gin
    add_index :projects, :description, using: :gin
    add_index :projects, :status, using: :gin
    add_index :projects, :link, using: :gin
  end
end
