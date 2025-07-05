Rails.application.routes.draw do
  resources :levels, only: [:index]
  resources :projects, only: [:index]
end