module Types
  class ChatType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :message, String, null: false
    field :created_at, GraphQL::Types::ISO8601Date, null: false
  end
end
