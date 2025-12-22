class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.jsonb :name, default: {}
      t.jsonb :subtitle, default: {}
      t.jsonb :bio, default: {}
      t.jsonb :story, default: {}
      t.jsonb :why, default: {}
      t.jsonb :personality, default: {}
      t.jsonb :values, default: {}
      t.jsonb :fun_facts, default: {}
      t.jsonb :social_links, default: {}
      t.jsonb :main_stack, default: {}
      t.jsonb :familiar, default: {}
      t.jsonb :recruiter_projects, default: {}
      t.jsonb :quick_stats, default: {}

      t.timestamps
    end
  end
end

