class MediaContainersController < ApplicationController

  def index
    @media_containers = MediaContainer.all
    render json: @media_containers, root: false
  end

end
