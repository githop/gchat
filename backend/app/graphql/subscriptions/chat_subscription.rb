module Subscriptions
  class ChatSubscription < Subscriptions::BaseSubscription
    field :chat, Types::ChatType, null: false
    
    def chat 
      object
    end
  end
end