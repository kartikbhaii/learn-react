import { useState } from "react";
import dayjs from "dayjs";
import { Chatbot } from "supersimpledev"
import "./ChatInput.css"

import LoadingSpinnerImage from '../assets/loading-spinner.gif'



export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  


  async function sendMessage() {
    const currentTime = dayjs().format("hh:mm A")
 
    if (isLoading || inputText === "") {
      return;
    }
    setInputText("");
    setIsLoading(true);

    

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: currentTime
      },
    ];

    const loadingChatMessages = [
      ...newChatMessages,
      {
        message: (
          <img
            className="loading-spinner-img"
            src={LoadingSpinnerImage}
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(loadingChatMessages);
    setInputText("");
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: currentTime
      },
    ]);
    setIsLoading(false);
  }

  function keywordButton(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  function removeMessages() {
    setChatMessages([])
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={keywordButton}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading || inputText === ""}
        className="send-button"
      >
        Send
      </button>
      <button 
      onClick={removeMessages}
      className="clear-button"
      >
        Clear
      </button>
    </div>
  );
}

