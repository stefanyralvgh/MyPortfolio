class ApplicationController < ActionController::API
  # The API language is determined via the query parameter (?language=es|en|fr)
  # instead of using the 'Accept-Language' header, to stay in sync with the frontend,
  # which also handles static texts and multilingual routes.
  # If in the future I want to unify language handling via header,
  # it can be centralized here using request.headers['Accept-Language'].
end 