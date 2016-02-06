class MediaContainersCreationForm
  include ActiveModel::Model

  attr_accessor :media_files, :article_pictures, :article_title, :article_id

  def save
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
    media_files.each do |media_file|
      article_picture = article_pictures.select do |article_pict|
        article_pict.has_key?('stored_file_id') && article_pict.fetch('stored_file_id') == media_file.keys[0].to_i
      end
      MediaContainerCreationForm.new(
        title: article_title,
        media_file: media_file.values[0],
        article_id: article_id,
        article_picture_is_for_card: article_picture[0].fetch('for_card'),
        article_picture_is_for_carousel: article_picture[0].fetch('for_carousel')
      ).save
    end
  end

end
