class CreateChats < ActiveRecord::Migration[5.2]
  def change
    create_table :chats, id: :uuid do |t|
      t.string :username
      t.text :message

      t.timestamps
    end
    add_index :chats, :username
  end
end
