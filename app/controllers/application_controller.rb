class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  def after_sign_up_path_for(resource)
    mypage_path(resource)
  end
  
  def after_sign_in_path_for(resource)
    mypage_path(resource)
  end
 
  private
  
  def counts(user)
    @count_posts = user.posts.count
  end
  
  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image]) 
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image])
  end
end
