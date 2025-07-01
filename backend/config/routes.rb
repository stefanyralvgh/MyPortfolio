Rails.application.routes.draw do
  resources :levels, only: [:index]
end