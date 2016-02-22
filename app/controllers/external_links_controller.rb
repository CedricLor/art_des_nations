class ExternalLinksController < ApplicationController

  # PATCH/PUT /external_links/1
  # PATCH/PUT /external_links/1.json
  def create
    @external_links_update_form = ExternalLinksUpdateForm.new(params[:external_linkings])

    respond_to do |format|
      if @external_links_update_form.update
        format.html { redirect_to @external_links_update_form.parent, notice: 'The links were successfully updated.' }
        format.json { head :no_content }
      else
        # FIXME -- This does not work
        format.html { render action: 'edit' }
        format.json { render json: @external_links_update_form.errors, status: :unprocessable_entity }
      end
    end
  end

end
