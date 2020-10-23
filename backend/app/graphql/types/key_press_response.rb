module Types
  class KeyPressResponse < Types::BaseObject
    field :username, String, null: false
    field :is_typing, Boolean, null: false
  end
end
