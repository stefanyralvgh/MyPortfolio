class BugReport
    attr_reader :description, :email, :url, :user_agent, :timestamp
  
    def initialize(description:, email:, url:, user_agent:, timestamp:)
      @description = description
      @email = email
      @url = url
      @user_agent = user_agent
      @timestamp = timestamp
    end
  end
  