class PortraitsController < ApplicationController
  before_action :set_portrait, only: [:show, :edit, :update, :destroy]

  # GET /portraits
  # GET /portraits.json
  def index
    # @portrait_feed = PortraitFeed.new(portraits: Portrait.all)
    # FIXME -- No includes !!!!! This is eager loading
    @portraits = Portrait.with_media_containers_for_card(params[:locale])
    @portrait_intro = PortraitIntro.find(1)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @portrait_feed }
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
    @portrait.destroy
    respond_to do |format|
      format.html { redirect_to portraits_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_portrait
      @portrait = Portrait.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def portrait_params
      params[:portrait]
    end
end
