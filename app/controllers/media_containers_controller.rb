class MediaContainersController < ApplicationController

  def show
    @media_container = MediaContainer.find(params[:id])
  end

  def index
    # @parent_item can be of type Article, Aktion or Portrait
    @parent_item = permitted_picturizable_type.
      constantize.
      includes(picturizings: [:translations, media_container: :translations]).
      find(params[:picturizable_id])
    @media_containers = @parent_item.media_containers
  end

  # def index
  #   @media_containers = MediaContainer.all
  #   # render json: @media_containers, root: false
  # end

  def new
    @media_container = MediaContainer.new
  end

  def create
    @media_container = MediaContainer.new(media_container_params)

    respond_to do |format|
      if @media_container.save
        format.html { render 'crop', notice: 'The new picture was successfully created. You can now crop it.' }
        # format.html { redirect_to @media_container, notice: 'The new picture was successfully created.' }
        format.json { render json: @media_container, status: :created }
      else
        format.html { render 'new', alert: 'The new picture could not be created. Sorry!!!' }
        format.json { render json: @media_container.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @media_container = MediaContainer.find(params[:id])

    if @media_container.update_attributes(media_container_params)
      # if params[:media_container][:file].blank?
      #   flash[:notice] = "The picture was successfully updated."
      redirect_to @media_container
      # else
      #   render :action => "crop"
      # end
    else
      render :action => 'edit'
    end
  end

  private

  def media_container_params
    params.require(:media_container).permit(
      :title,
      :media,
      :source_url,
      :author,
      :creation_date,
      :crop_x,
      :crop_y,
      :crop_h,
      :crop_w
    )
  end

  def permitted_picturizable_type
    if %(Aktion Article Portrait).include?(params[:picturizable_type])
      return params[:picturizable_type]
    else
      respond_to do |format|
        format.html { redirect_to :back, alert: "You cannot manage pictures for the #{params[:picturizable_type].pluralize}." }
        format.json { head :no_content }
      end
    end
  end
end
