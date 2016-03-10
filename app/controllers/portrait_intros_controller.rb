class PortraitIntrosController < ApplicationController
  include OgMetaTagsSetter
  before_action :set_portrait_intro_and_portraits, only: [:show, :edit, :update]
  skip_before_action :authenticate_user!, only: :show
  before_action :set_item_i18n_name

  # GET /portrait_intros/1
  # GET /portrait_intros/1.json
  def show
    set_og_meta_tags(@portrait_intro)

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
      @portraits = Portrait.for_portrait_list
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def portrait_intro_params
      params.require(:portrait_intro).permit(:intro)
    end

    def set_item_i18n_name
      @item_i18n_name = t(:item_portrait_intro, default: "Profiles' page")
    end
end
