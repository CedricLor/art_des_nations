class AktionsController < ApplicationController
  before_action :set_aktion, only: [:show, :destroy]
  before_action :clean_up_date_params, only: [:create, :update]
  before_action :set_aktion_creation_form, only: [:new, :create]
  before_action :set_aktion_update_form, only: [:edit, :update]
  before_action :set_item_i18n_name
  skip_before_action :authenticate_user!, only: :show


  # GET /aktions
  # GET /aktions.json
  def index
    @aktions = Aktion.all

    respond_to do |format|
      format.html {render :layout => 'application'} # index.html.erb
      format.json { render json: @aktions }
    end
  end

  # GET /aktions/1
  # GET /aktions/1.json
  def show
    @media_containers = @aktion.media_containers_for_carousel

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @aktion }
    end
  end

  # GET /aktions/new
  def new
  end

  # GET /aktions/1/edit
  def edit
  end

  # POST /aktions
  # POST /aktions.json
  def create
    respond_to do |format|
      if @aktion.submit
        format.html { redirect_to @aktion.aktion, notice: 'The new action was successfully created.' }
        format.json { render json: @aktion.aktion, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @aktion.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /aktions/1
  # PATCH/PUT /aktions/1.json
  def update
    respond_to do |format|
      if @aktion.submit
        format.html { redirect_to @aktion.aktion, notice: 'The action was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @aktion.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /aktions/1
  # DELETE /aktions/1.json
  def destroy
    AktionArticlePortraitDestroy.destroy(@aktion)
    respond_to do |format|
      format.html { redirect_to aktions_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_aktion
      @aktion = Aktion.find(params[:id])
    end

    def set_aktion_creation_form
      @aktion = AktionCreationForm.new(params[:aktion])
      @url = aktions_path
      @method = "post"
    end

    def set_aktion_update_form
      @item = @aktion = AktionUpdateForm.new(params[:aktion] ? {id: params[:id]}.merge(params[:aktion]) : {id: params[:id]})
      @url = aktion_path(params[:id])
      @method = "put"
    end

    def clean_up_date_params
      aktion = params[:aktion]
      params[:aktion][:aktion_date] = Date.new aktion["aktion_date(1i)"].to_i, aktion["aktion_date(2i)"].to_i, aktion["aktion_date(3i)"].to_i
      params[:aktion][:posted_at] = Date.new aktion["posted_at(1i)"].to_i, aktion["posted_at(2i)"].to_i, aktion["posted_at(3i)"].to_i
      params[:aktion] = aktion.except('aktion_date(1i)', 'aktion_date(2i)', 'aktion_date(3i)', 'posted_at(1i)', 'posted_at(2i)', 'posted_at(3i)')
    end

    def set_item_i18n_name
      @the_item_i18n_name = t(:the_item_action, default: 'the action')
      @this_item_i18n_name = t(:this_item_action, default: 'this action')
      @an_item_i18n_name = t(:an_item_action, default: 'an action')
    end
end
