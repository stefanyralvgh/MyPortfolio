class BugReportsController < ApplicationController
  def create
    company =
      params.dig(:bug_report, "company").to_s.presence ||
      params["company"].to_s

    return head :ok if company.present?

    bug = params.require(:bug_report)
    return head :ok if bug["description"].to_s.length < 20

    begin
      Rails.logger.info "📧 Attempting to send email..."
      BugReportMailer.report_email(
        description: bug["description"],
        email: bug["email"],
        url: bug["url"],
        user_agent: bug["user_agent"],
        timestamp: bug["timestamp"]
      ).deliver_now
      
      Rails.logger.info "✅ Email sent successfully"
    rescue => e
      Rails.logger.error "❌ Email failed: #{e.class} - #{e.message}"
      Rails.logger.error e.backtrace.first(5).join("\n")
    end

    head :ok
  end
end