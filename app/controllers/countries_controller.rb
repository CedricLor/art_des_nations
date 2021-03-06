class CountriesController < ApplicationController
  include OgMetaTagsSetter
  before_action :set_country, only: [:show, :edit]
  before_action :set_ancillary_collections, only: [:show, :edit]
  before_action :set_item_i18n_name
  before_action :set_items_i18n_name, only: [:index]

  skip_before_action :authenticate_user!, only: :show

  # GET /countries/1
  # GET /countries/1.json
  def show
    set_og_meta_tags(@country)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @country }
    end
  end

  # GET /countries/1/edit
  def edit
  end

  # PATCH/PUT /countries/1
  # PATCH/PUT /countries/1.json
  def update
    @country_update_form = CountryUpdateForm.new(
      {id: params[:id]}.
      merge(params[:country]).
      merge({
        external_linkings: params[:external_linkings]
      })
    )

    respond_to do |format|
      if @country_update_form.update
        format.html { redirect_to @country_update_form.country, notice: 'The country page was successfully updated.' }
        format.json { head :no_content }
      else
        set_country
        set_ancillary_collections
        format.html { render action: 'edit' }
        format.json { render json: @country_update_form.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_country
      @country = Country.
        includes(:translations, external_linkings: [external_link: :translations]).
        find(params[:id])
    end

    def set_ancillary_collections
      @aktions = Aktion.for_country(@country)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def country_params
      params.require(:country).permit(:name, :title, :editorial)
    end

    def set_item_i18n_name
      @item_i18n_name = t(:item_country, default: 'Country')
    end

    def set_items_i18n_name
      @item_i18n_name = @item_i18n_name.pluralize
    end
end
