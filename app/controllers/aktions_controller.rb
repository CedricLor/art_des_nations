class AktionsController < ApplicationController
  before_action :set_aktion, only: [:show, :edit, :update, :destroy]

  # GET /aktions
  # GET /aktions.json
  def index
    @aktions = Aktion.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @aktions }
    end
  end

  # GET /aktions/1
  # GET /aktions/1.json
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @aktion }
    end
  end

  # GET /aktions/new
  def new
    @aktion = Aktion.new
  end

  # GET /aktions/1/edit
  def edit
  end

  # POST /aktions
  # POST /aktions.json
  def create
    @aktion = Aktion.new(aktion_params)

    respond_to do |format|
      if @aktion.save
        format.html { redirect_to @aktion, notice: 'Aktion was successfully created.' }
        format.json { render json: @aktion, status: :created }
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
      if @aktion.update(aktion_params)
        format.html { redirect_to @aktion, notice: 'Aktion was successfully updated.' }
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
    @aktion.destroy
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

    # Never trust parameters from the scary internet, only allow the white list through.
    def aktion_params
      params[:aktion]
    end
end
