class CountriesController < ApplicationController
  before_action :set_country, only: [:show, :edit, :update]
  before_action :set_ancillary_collections, only: [:show, :edit, :update]

  skip_before_action :authenticate_user!, only: :show

  # GET /countries/1
  # GET /countries/1.json
  def show
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
    respond_to do |format|
      if @country.update(country_params)
        format.html { redirect_to @country, notice: 'Country was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @country.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_country
      @country = Country.includes(:aktions).find(params[:id])
    end

    def set_ancillary_collections
      @aktions_by_country = Aktion.by_country(@country, locale)
      @external_links_by_country = ExternalLink.includes(:countries).where(countries: {id: 1})
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def country_params
      params.require(:country).permit(:name, :title, :editorial)
    end
end
