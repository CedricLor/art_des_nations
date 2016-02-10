class PortraitFeed
  NUMBER_OF_PORTRAITS = 20

  # def initialize(portraits:)
  #   @portraits = portraits.order(created_at: :desc).limit(10)
  #   @picture_cache = build_picture_cache
  # end

  # def portraits
  #   @portraits.map { |portrait| PortraitWithMediaContainer.new(post, @picture_cache) }
  # end

  private

#   def build_comment_cache
#     media_containers.group_by(&:post_id)
#   end

#   def comments
#     Comment.
#       select("*").
#       from(Arel.sql("(#{ranked_comments_query}) AS ranked_comments")).
#       where("comment_rank <= 3")
#   end

#   def ranked_comments_query
#     Comment.where(post_id: @posts.map(&:id)).select(<<-SQL).to_sql
#       comments.*,
#       dense_rank() OVER (
#         PARTITION BY comments.post_id
#         ORDER BY comments.created_at DESC
#       ) AS comment_rank
#     SQL
#   end
# end


  # def initialize(portraits:)
  #   @portraits = portraits.order(created_at: :desc).limit(NUMBER_OF_PORTRAITS)
  # end

  # def with_picture_for_index_view
  #   @portraits.map { |portrait| portrait.media_containers.where(for_card: "true").last }
  # end
end
