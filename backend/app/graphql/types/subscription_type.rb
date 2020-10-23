class Types::SubscriptionType < Types::BaseObject
  extend GraphQL::Subscriptions::SubscriptionRoot

  field :on_chat_received, subscription: Subscriptions::ChatSubscription
  field :on_keypress, subscription: Subscriptions::KeyPressSubscription
end