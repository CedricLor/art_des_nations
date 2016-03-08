class LinkingsController < ApplicationController

  def index
    # @parent_item can be of type Article, Aktion or Portrait
    @parent_item = permitted_linkable_type.constantize.find(params[:linkable_id])
  end

  # POST /articles
  # POST /articles.json
  def create
    @linking = Linking.new(linking_params)

    respond_to do |format|
      if @linking.save
        format.html { redirect_to :back, notice: 'The new link was successfully created.' }
        format.json { render json: @linking, status: :created }
      else
        format.html { redirect_to :back, alert: 'The new link could not be created. Sorry!!!' }
        format.json { render json: @linking.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/:article_id/linkings/:id
  # DELETE /articles/:article_id/linkings/:id.json
  def destroy
    Linking.destroy(params[:id])
    respond_to do |format|
      format.html { redirect_to :back, notice: 'The link was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private

  def linking_params
    params[:linking][:from_linkable_id] = params[:linking][:from_linkable_id].to_i
    params.require(:linking).permit(:from_linkable_type, :from_linkable_id, :to_linkable_type, :to_linkable_id)
  end

  def permitted_linkable_type
    if %(Aktion Article Portrait).include?(params[:linkable_type])
      return params[:linkable_type]
    else
      respond_to do |format|
        format.html { redirect_to :back, alert: "You cannot manage links for the #{params[:linkable_type].pluralize}." }
        format.json { head :no_content }
      end
    end
  end
end
