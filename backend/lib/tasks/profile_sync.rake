namespace :profile do
    desc "Export local profile to JSON"
    task export_json: :environment do
      profile = Profile.first
      
      if profile.nil?
        puts "❌ No profile found in local database"
        exit
      end
  
      profile_data = {
        name: profile.name,
        subtitle: profile.subtitle,
        bio: profile.bio,
        story: profile.story,
        why: profile.why,
        personality: profile.personality,
        values: profile.values,
        fun_facts: profile.fun_facts,
        social_links: profile.social_links,
        main_stack: profile.main_stack,
        familiar: profile.familiar,
        recruiter_projects: profile.recruiter_projects,
        quick_stats: profile.quick_stats
      }
  
      FileUtils.mkdir_p('db/seeds')
      File.write('db/seeds/profile_data.json', JSON.pretty_generate(profile_data))
      
      puts "✅ Profile exported to db/seeds/profile_data.json"
    end
  
    desc "Import profile from JSON"
    task import_json: :environment do
      file_path = Rails.root.join('db', 'seeds', 'profile_data.json')
      
      unless File.exist?(file_path)
        puts "❌ File not found: #{file_path}"
        exit
      end
  
      profile_data = JSON.parse(File.read(file_path))
      profile = Profile.find_or_create_by(id: 1)
      
      if profile.update(profile_data)
        puts "✅ Profile imported successfully!"
      else
        puts "❌ Error: #{profile.errors.full_messages}"
      end
    end
  end