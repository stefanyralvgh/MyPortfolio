class BugReportMailer < ApplicationMailer
  def report_email(description:, email:, url:, user_agent:, timestamp:)
    @description = description
    @email = email
    @url = url
    @user_agent = user_agent
    @timestamp = timestamp

    mail(
      to: ENV.fetch("BUG_REPORT_EMAIL"),  
      from: "stefanyramosalvis+bugs@gmail.com", 
      reply_to: email, 
      subject: "🐛 New Bug Report"
    )
  end
end


