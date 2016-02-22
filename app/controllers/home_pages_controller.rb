class HomePagesController < ApplicationController
  before_action :set_home_page, only: [:show, :edit, :update]
  before_action :set_ancillary_collections, only: [:show, :edit, :update]
  skip_before_action :authenticate_user!, only: :show

  # GET /home_pages/1
  # GET /home_pages/1.json
  def show
    respond_to do |format|
      format.html { render } # show.html.erb
      format.json { render json: @home_page }
    end
  end

  # GET /home_pages/1/edit
  def edit
  end

  # PATCH/PUT /home_pages/1
  # PATCH/PUT /home_pages/1.json
  def update
    respond_to do |format|
      if @home_page.update(home_page_params)
        format.html { redirect_to @home_page, notice: 'Home page was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @home_page.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_home_page
      @home_page = HomePage.includes(external_linkings: [external_link: :translations]).find(1)
    end

    def set_ancillary_collections
      # @external_links_for_home_page = ExternalLink.includes(:home_pages).where(home_pages: {id: 1})
      @articles = Article.for_home_page
      @portraits_for_home_page = Portrait.for_home_page.slice(0, 3)
      @aktions = Aktion.for_home_page
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def home_page_params
      params.require(:home_page).permit(:editorial, :call_to_action)
    end
end
