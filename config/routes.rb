Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users,only: [:index,:update,:edit]
  resources :groups,only: [:new,:edit,:create,:update,:index]  do
    resources :messages, only: [:index, :create]
  end
end
