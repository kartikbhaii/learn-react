import { useAutoScroll } from "./UseAutoScroll";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css"

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  if (chatMessages.length === 0) {
    return (

      
      <p className="welcome-message">
        Welcome to the chatbot project! Send a message using the textbox below
      </p>
    );
  }
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;