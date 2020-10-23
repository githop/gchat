module Mutations
  class KeyPressCreate < Mutations::BaseMutation
    argument :is_typing, Boolean, required: true
    argument :username, String, required: true
    
    field :is_typing, Boolean, null: false
    field :username, String, null: false

    def resolve(is_typing:, username:)
      repo = ChatRepository.new
      repo.on_keypress(is_typing: is_typing, username: username)

      { is_typing: is_typing, username: username }
    end

  end
end