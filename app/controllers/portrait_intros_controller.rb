class PortraitIntrosController < ApplicationController
  before_action :set_portrait_intro_and_portraits, only: [:show, :edit, :update]

  # GET /portrait_intros/1
  # GET /portrait_intros/1.json
  def show
    # @portrait_feed = PortraitFeed.new(portraits: Portrait.all)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @portrait_intro }
    end
  end

  # GET /portrait_intros/1/edit
  def edit
  end

  # PATCH/PUT /portrait_intros/1
  # PATCH/PUT /portrait_intros/1.json
  def update
    respond_to do |format|
      if @portrait_intro.update(portrait_intro_params)
        format.html { redirect_to @portrait_intro, notice: 'Portrait intro was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @portrait_intro.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_portrait_intro_and_portraits
      @portrait_intro = PortraitIntro.find(1)
      @portraits = Portrait.with_media_containers_for_card
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def portrait_intro_params
      params.require(:portrait_intro).permit(:intro)
    end
end
