Rails.application.routes.draw do
  # Health check and ping endpoints for API wake up
  get '/health', to: 'application#health'
  get '/ping', to: 'application#ping'
  
  # Main API endpoints
  resources :levels, only: [:index]
  resources :projects, only: [:index]
end