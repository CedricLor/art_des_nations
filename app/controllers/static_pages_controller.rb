class StaticPagesController < ApplicationController
  include OgMetaTagsSetter

  before_action :set_static_page, only: [:show, :edit, :update, :destroy]
  skip_before_action :authenticate_user!, only: [:show]
  before_action :set_item_i18n_name
  before_action :set_items_i18n_name, only: [:index]

  # GET /static_pages
  # GET /static_pages.json
  def index
    @static_pages = StaticPage.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @static_pages }
    end
  end

  # GET /static_pages/1
  # GET /static_pages/1.json
  def show
    set_og_meta_tags(@static_page)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @static_page }
    end
  end

  # GET /static_pages/new
  def new
    @static_page = StaticPage.new
  end

  # GET /static_pages/1/edit
  def edit
  end

  # POST /static_pages
  # POST /static_pages.json
  def create
    @static_page = StaticPage.new(static_page_params)

    respond_to do |format|
      if @static_page.save
        format.html { redirect_to @static_page, notice: 'Static page was successfully created.' }
        format.json { render json: @static_page, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @static_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /static_pages/1
  # PATCH/PUT /static_pages/1.json
  def update
    respond_to do |format|
      if @static_page.update(static_page_params)
        format.html { redirect_to @static_page, notice: 'Static page was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @static_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /static_pages/1
  # DELETE /static_pages/1.json
  def destroy
    @static_page.destroy
    respond_to do |format|
      format.html { redirect_to static_pages_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_static_page
      @static_page = StaticPage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def static_page_params
      params.require(:static_page).permit(:title, :body, :teaser)
    end

    def set_item_i18n_name
      @item_i18n_name = t(:item_static_page, default: 'Static Page')
    end

    def set_items_i18n_name
      @item_i18n_name = @item_i18n_name.pluralize
    end
end
