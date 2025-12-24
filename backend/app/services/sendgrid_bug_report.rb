# app/services/sendgrid_bug_report.rb
require "sendgrid-ruby"

class SendgridBugReport
  include SendGrid

  def self.send!(data)
    from = Email.new(email: "noreply@stefralv.com")
    to   = Email.new(email: "contacto@juddy.dev")
    subject = "Nuevo bug report"
    content = Content.new(
      type: "text/plain",
      value: <<~TEXT
        Email: #{data[:email]}
        URL: #{data[:url]}
        UA: #{data[:user_agent]}
        Time: #{data[:timestamp]}

        #{data[:description]}
      TEXT
    )

    mail = Mail.new(from, subject, to, content)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    sg.client.mail._("send").post(request_body: mail.to_json)
  rescue => e
    Rails.logger.error("SendGrid failed: #{e.message}")
  end
end
