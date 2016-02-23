class PortraitsController < ApplicationController
  before_action :set_portrait, only: [:show, :edit, :update]
  skip_before_action :authenticate_user!, only: [:index, :show]

  # GET /portraits
  # GET /portraits.json
  def index
    @portraits = Portrait.
      includes(picturizing: [:media_container]).
      includes(categorizings: [:category])
    @picturizings = Picturizing.unscoped.
      where(picturizable_type: "Portrait").
      group(:picturizable_id).
      count

    respond_to do |format|
      format.html {render :layout => 'application'} # index.html.erb
      format.json { render json: @portraits }
    end
  end

  # GET /portraits/1
  # GET /portraits/1.json
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @portrait }
    end
  end

  # GET /portraits/new
  def new
    @portrait = Portrait.new
  end

  # GET /portraits/1/edit
  def edit
  end

  # POST /portraits
  # POST /portraits.json
  def create
    @portrait = Portrait.new(portrait_params)

    respond_to do |format|
      if @portrait.save
        format.html { redirect_to @portrait, notice: 'Portrait was successfully created.' }
        format.json { render json: @portrait, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @portrait.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /portraits/1
  # PATCH/PUT /portraits/1.json
  def update
    respond_to do |format|
      if @portrait.update(portrait_params)
        format.html { redirect_to @portrait, notice: 'Portrait was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @portrait.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /portraits/1
  # DELETE /portraits/1.json
  def destroy
    PortraitDestroy.destroy(params[:id])
    # @portrait.destroy
    respond_to do |format|
      format.html { redirect_to portraits_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_portrait
      @portrait = Portrait.includes(media_container: :translations).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def portrait_params
      params.require(:portrait).permit(
        :title,
        :body,
        :teaser,
        :status,
        :picture_title,
        :main_category_id,
        :new_category_name,
        new_md: [:file, :title, :change_everywhere],
        applicable_existing_categories: params[:portrait][:applicable_existing_categories].try(:keys)
      )
    end
end
