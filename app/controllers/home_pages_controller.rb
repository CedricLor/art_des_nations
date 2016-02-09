class HomePagesController < ApplicationController
  before_action :set_home_page, only: [:show, :edit, :update]

  # GET /home_pages/1
  # GET /home_pages/1.json
  def show
    respond_to do |format|
      format.html # show.html.erb
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
      @home_page = HomePage.find(1)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def home_page_params
      params.require(:home_page).permit(:show)
    end
end
