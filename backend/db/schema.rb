# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_07_04_225733) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "levels", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "titles", default: {}
    t.jsonb "descriptions", default: {}
    t.jsonb "question", default: {}
    t.jsonb "options", default: {}
    t.string "correct_option"
    t.jsonb "explanation", default: {}
  end

  create_table "projects", force: :cascade do |t|
    t.jsonb "title", default: {}, null: false
    t.jsonb "role", default: {}, null: false
    t.jsonb "tech", default: {}, null: false
    t.jsonb "description", default: {}, null: false
    t.jsonb "status", default: {}, null: false
    t.jsonb "link", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["description"], name: "index_projects_on_description", using: :gin
    t.index ["link"], name: "index_projects_on_link", using: :gin
    t.index ["role"], name: "index_projects_on_role", using: :gin
    t.index ["status"], name: "index_projects_on_status", using: :gin
    t.index ["tech"], name: "index_projects_on_tech", using: :gin
    t.index ["title"], name: "index_projects_on_title", using: :gin
  end

end
