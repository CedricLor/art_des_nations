class CategoriesController < ApplicationController
  before_action :set_category_with_aktions_and_articles, only: [:show, :edit, :update]
  before_action :set_category, only: [:destroy]
  before_action :set_item_i18n_name
  before_action :set_items_i18n_name, only: [:index]
  skip_before_action :authenticate_user!, only: :show

  # GET /categories
  # GET /categories.json
  def index
    @categories = Category.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @categories }
    end
  end

  # GET /categories/1
  # GET /categories/1.json
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @category }
    end
  end

  # GET /categories/new
  def new
    @category = Category.new
  end

  # GET /categories/1/edit
  def edit
  end

  # POST /categories
  # POST /categories.json
  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        format.html { redirect_to @category, notice: 'Category was successfully created.' }
        format.json { render json: @category, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categories/1
  # PATCH/PUT /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to @category, notice: 'Category was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.json
  def destroy
    @category.destroy
    respond_to do |format|
      format.html { redirect_to categories_url }
      format.json { head :no_content }
    end
  end

  private
    def set_category_with_aktions_and_articles
      @category = Category.includes(:translations).find(params[:id])
      @categorized_articles_and_aktions = Category.articles_aktions_and_portraits_for_category(@category.id)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def category_params
      params.require(:category).permit(:name, :editorial)
    end

    def set_item_i18n_name
      @the_item_i18n_name = t(:the_item_category, default: 'the category')
      @this_item_i18n_name = t(:this_item_category, default: 'this category')
      @an_item_i18n_name = t(:an_item_category, default: 'a category')
      @item_i18n_name = t(:item_category, default: 'Category')
    end

    def set_items_i18n_name
      @item_i18n_name = @item_i18n_name.pluralize
    end
end
