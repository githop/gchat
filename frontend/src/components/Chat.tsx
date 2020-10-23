import React, { useEffect, useState } from "react";
import "./Chat.css";
import {
  useChatsQuery,
  useChatCreateMutation,
  OnChatReceivedSubscription,
  OnChatReceivedDocument,
  useOnKeyPressSubscription,
  useSendKeyPressMutation,
  Chat,
} from "../generated/graphql";

function useIsTyping(text: string, username: string) {
  const [keyPressMutation] = useSendKeyPressMutation();
  const { data } = useOnKeyPressSubscription();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    keyPressMutation({ variables: { input: { isTyping: true, username } } });

    timeout = setTimeout(() => {
      keyPressMutation({ variables: { input: { isTyping: false, username } } });
    }, 500);

    return () => clearTimeout(timeout);
  }, [text, username, keyPressMutation]);

  const isTyping = data?.onKeypress?.response.isTyping ?? false;
  const typingUser = data?.onKeypress?.response.username ?? "";

  return { isTyping, typingUser };
}

function useChats() {
  const { subscribeToMore, ...rest } = useChatsQuery();

  useEffect(() => {
    subscribeToMore<OnChatReceivedSubscription>({
      document: OnChatReceivedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.onChatReceived) {
          return prev;
        }
        const newChat = subscriptionData.data.onChatReceived.chat;

        return {
          ...prev,
          chats: [newChat, ...prev.chats],
        };
      },
    });
  }, [subscribeToMore]);

  return rest;
}

export const ChatList: React.FC<{ chats: Chat[] }> = ({ chats }) => {
  const sorted = [...chats].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return +new Date(a.createdAt) - +new Date(b.createdAt);
    }
    return 0;
  });

  return (
    <div className="chat__list">
      {sorted.map((chat) => (
        <ChatMessage {...chat} key={chat.id} />
      ))}
    </div>
  );
};

export const ChatMessage: React.FC<Omit<Chat, "id">> = ({
  message,
  createdAt,
  username,
}) => {
  return (
    <div className="chat__message">
      <div className="chat__message--header">
        <div>{username}</div> -{" "}
        <div>{new Date(createdAt).toLocaleString()}</div>
      </div>
      <p>{message}</p>
    </div>
  );
};

const ChatInput: React.FC<{
  text: string;
  onChange: (text: string) => void;
}> = ({ text, onChange }) => {
  return (
    <input
      placeholder="type message"
      value={text}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const userNames = [
  "Leia",
  "Anakin",
  "Deanna",
  "Jean-Luc",
  "Ezra",
  "Luke",
  "Kira",
  "Hoshi",
];

const UserSelect: React.FC<{
  users: string[];
  user: string;
  onSelect: (user: string) => void;
}> = ({ users, user, onSelect }) => {
  return (
    <select value={user} onChange={(e) => onSelect(e.target.value)}>
      {users.map((u) => (
        <option key={u} value={u}>
          {u}
        </option>
      ))}
    </select>
  );
};

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const ChatContainer: React.FC = () => {
  const { data } = useChats();
  const [text, setText] = useState("");
  const [sender, setSender] = useState(randomElement(userNames));
  const [chatCreate] = useChatCreateMutation();
  const { isTyping, typingUser } = useIsTyping(text, sender);

  const handleSubmit = () => {
    chatCreate({
      variables: { input: { message: text, username: sender } },
    }).then(() => {
      setText("");
    });
  };

  const chats = data?.chats ?? [];

  return (
    <div className="chat__container">
      <ChatList chats={chats} />
      <div className="chat__controls">
        <div className="chat__typing">
          <small>{isTyping ? `${typingUser} is typing...` : ""}</small>
        </div>
        <div>
          <UserSelect users={userNames} user={sender} onSelect={setSender} />
          <ChatInput text={text} onChange={setText} />
        </div>
        <button onClick={handleSubmit}>send</button>
      </div>
    </div>
  );
};
