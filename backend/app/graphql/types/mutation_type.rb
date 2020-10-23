module Types
  class MutationType < Types::BaseObject
    field :chat_create, mutation: Mutations::ChatCreate
    field :on_keypress, mutation: Mutations::KeyPressCreate
  end
end
