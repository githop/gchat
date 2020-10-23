module Types
  class QueryType < Types::BaseObject
    field :chats, [Types::ChatType], null: false
    def chats
      chat_repo.list_chats
    end

    private

    def chat_repo
      @chat_repo ||= ChatRepository.new
    end
  end
end
