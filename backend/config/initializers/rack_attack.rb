class Rack::Attack
    throttle("bug_reports/ip", limit: 3, period: 60) do |req|
      if req.path == "/bug_reports" && req.post?
        req.ip
      end
    end
  end
  