class ToppagesController < ApplicationController
  def index
    if user_signed_in?
      @post = current_user.posts.build
      @posts = Post.order(id: :desc).page(params[:page])
      # @posts = current_user.feed_posts.order(id: :desc).page(params[:page])
    end
    
    
  end
end
