class BugReportsController < ApplicationController
  def create
    company =
    params.dig(:bug_report, "company").to_s.presence ||
    params["company"].to_s

  return head :ok if company.present?

  bug_report = params.require(:bug_report)

    if bug_report["description"].to_s.length < 20
      render json: { error: "Invalid report" }, status: :bad_request
      return
    end

    if bug_report["email"].present?
      key = "bug_report:#{bug_report['email']}"

      if Rails.cache.read(key)
        return head :ok
      end

      Rails.cache.write(key, true, expires_in: 10.minutes)
    end

    Rails.logger.info("HONEYPOT RAW: #{bug_report.inspect}")
    Rails.logger.info("HONEYPOT VALUE: #{company}")

    BugReportMailer.report_email(
      description: bug_report["description"],
      email: bug_report["email"],
      url: bug_report["url"],
      user_agent: bug_report["user_agent"],
      timestamp: bug_report["timestamp"]
    ).deliver_now

    head :ok
  end
end
