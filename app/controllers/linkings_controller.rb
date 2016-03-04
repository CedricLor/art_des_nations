class LinkingsController < ApplicationController
  before_action { |controller| @redirect_url = set_redirect_url }
  before_action :set_from_linkable, only: [:create]

  # POST /articles
  # POST /articles.json
  def create
    @linking = Linking.new(
      from_linkable_type: @from_linkable_type,
      from_linkable_id: @from_linkable_id,
      to_linkable_type: params[:to_linkable_type],
      to_linkable_id: params[:to_linkable_id]
    )

    respond_to do |format|
      if @linking.save
        format.html { redirect_to @redirect_url, notice: 'The new link was successfully created.' }
        # format.json { render json: @article.article, status: :created }
      else
        # format.html { render action: 'new' }
        # format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/:article_id/linkings/:id
  # DELETE /articles/:article_id/linkings/:id.json
  def destroy
    Linking.destroy(params[:id])
    respond_to do |format|
      # format.html { redirect_to articles_url, notice: 'The article was successfully deleted.' }
      format.html { redirect_to @redirect_url, notice: 'The link was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private

  def set_redirect_url
    return edit_article_url(params[:article_id]) if params[:article_id]
    return edit_aktion_url(params[:aktion_id]) if params[:aktion_id]
    return edit_portrait_url(params[:portrait_id]) if params[:portrait_id]
  end

  def set_from_linkable
    if @from_linkable_id = params[:article_id]
      @from_linkable_type = 'Article'
    elsif @from_linkable_id = params[:aktion_id]
      @from_linkable_type = 'Aktion'
    elsif @from_linkable_id = params[:portrait_id]
      @from_linkable_type = 'Portrait'
    end
  end
end
