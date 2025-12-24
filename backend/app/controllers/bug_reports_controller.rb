def create
  company =
    params.dig(:bug_report, "company").to_s.presence ||
    params["company"].to_s

  return head :ok if company.present?

  bug = params.require(:bug_report)
  return head :ok if bug["description"].to_s.length < 20

  SendgridBugReport.send!(
    description: bug["description"],
    email: bug["email"],
    url: bug["url"],
    user_agent: bug["user_agent"],
    timestamp: bug["timestamp"]
  )

  head :ok
end
