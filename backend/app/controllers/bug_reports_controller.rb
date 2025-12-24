class BugReportsController < ApplicationController
  def create
    BugReportMailer
      .report_email(**bug_report_params.to_h.symbolize_keys)
      .deliver_now

    render json: { message: "Bug report sent successfully" }, status: :created
  rescue => e
    Rails.logger.error("[BugReport] #{e.message}")
    render json: { error: "Failed to send bug report" }, status: :internal_server_error
  end

  private

  def bug_report_params
    params.require(:bug_report).permit(
      :description,
      :email,
      :url,
      :user_agent,
      :timestamp
    )
  end
end
