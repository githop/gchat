class ChatRepository
  def list_chats
    Chat.all
  end

	def new_chat(username:, message:)
		Chat.create!(username: username, message: message).tap do |chat|
				BackendSchema.subscriptions.trigger(:on_chat_received, {}, {chat: chat})
		end
	end

	def on_keypress(is_typing:, username:)
		response = {is_typing: is_typing, username: username}
		BackendSchema.subscriptions.trigger(:on_keypress, {}, {response: response})
	end
end