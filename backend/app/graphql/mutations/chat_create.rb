module Mutations
  class ChatCreate < Mutations::BaseMutation
    argument :username, String, required: true
    argument :message, String, required: true

    field :chat, Types::ChatType, null: false

    def resolve(username:, message:)
      repo = ChatRepository.new
      chat = repo.new_chat(username: username, message: message)

      { chat: chat }
    end

  end
end