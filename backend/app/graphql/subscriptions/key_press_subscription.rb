module Subscriptions
  class KeyPressSubscription < Subscriptions::BaseSubscription
    field :response, Types::KeyPressResponse, null: false
    
    def response
      object
    end
  end
end