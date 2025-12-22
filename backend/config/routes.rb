Rails.application.routes.draw do
  # Health check and ping endpoints for API wake up
  get '/health', to: 'application#health'
  get '/ping', to: 'application#ping'
  
  # Main API endpoints
  resources :levels, only: [:index]
  resources :projects, only: [:index]
  get '/profile', to: 'profiles#show'

  # Admin routes
  namespace :admin do
    # Authentication
    post '/login', to: 'sessions#create'
    get '/me', to: 'sessions#show'
    
    # Resources
    resources :projects, except: [:new, :edit]
    resources :levels, except: [:new, :edit]
    resource :profile, only: [:show, :update]
    resources :cvs, only: [:index, :create, :destroy]
  end
end