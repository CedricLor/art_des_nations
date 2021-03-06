class SiteEditorialsController < ApplicationController
  include OgMetaTagsSetter
  before_action :set_site_editorial, only: [:show, :edit, :update, :destroy]
  before_action :clean_up_posted_at_params, only: [:create, :update]
  before_action :set_item_i18n_name
  before_action :set_items_i18n_name, only: [:index]
  skip_before_action :authenticate_user!, only: [:show]

  # GET /site_editorials
  # GET /site_editorials.json
  def index
    @site_editorials = SiteEditorial.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @site_editorials }
    end
  end

  # GET /site_editorials/1
  # GET /site_editorials/1.json
  def show
    set_og_meta_tags(@site_editorial)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @site_editorial }
    end
  end

  # GET /site_editorials/new
  def new
    @site_editorial = SiteEditorial.new
  end

  # GET /site_editorials/1/edit
  def edit
  end

  # POST /site_editorials
  # POST /site_editorials.json
  def create
    @site_editorial = SiteEditorial.new(site_editorial_params)

    respond_to do |format|
      if @site_editorial.save
        format.html { redirect_to @site_editorial, notice: 'Site editorial was successfully created.' }
        format.json { render json: @site_editorial, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @site_editorial.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /site_editorials/1
  # PATCH/PUT /site_editorials/1.json
  def update
    respond_to do |format|
      if @site_editorial.update(site_editorial_params)
        format.html { redirect_to @site_editorial, notice: 'Site editorial was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @site_editorial.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /site_editorials/1
  # DELETE /site_editorials/1.json
  def destroy
    @site_editorial.destroy
    respond_to do |format|
      format.html { redirect_to site_editorials_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_site_editorial
      @site_editorial = SiteEditorial.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def site_editorial_params
      params.require(:site_editorial).permit(:title, :body, :status, :posted_at)
    end

    def clean_up_posted_at_params
      if params[:site_editorial]["posted_at(1i)"]
        se = params[:site_editorial]
        se[:posted_at] = Date.new se["posted_at(1i)"].to_i, se["posted_at(2i)"].to_i, se["posted_at(3i)"].to_i
        params[:site_editorial] = se.except('posted_at(1i)', 'posted_at(2i)', 'posted_at(3i)')
      end
    end

    def set_item_i18n_name
      @the_item_i18n_name = t(:the_item_site_editorial, default: 'the editorial')
      @this_item_i18n_name = t(:this_item_site_editorial, default: 'this editorial')
      @an_item_i18n_name = t(:an_item_site_editorial, default: 'an editorial')
      @item_i18n_name = t(:item_editorial, default: 'Editorial')
    end

    def set_items_i18n_name
      @item_i18n_name = @item_i18n_name.pluralize
    end
end
