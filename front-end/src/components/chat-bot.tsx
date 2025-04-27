import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Furia_Esports_logo from "../../public/logos/Furia_Esports_logo.png";
import avatar_user from "../../public/image/avatarUser.jpg";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isTyping, setIsTyping] = useState(false);

  async function sendMessage(userMessage: string) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3333/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-96 bg-white">
      {/* Messages container */}
      <div>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            {msg.content}
          </div>
        ))}
        {isTyping && <div>Digitando...</div>}
      </div>
      {/* <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {messages.map((msg, idx) => (
          <div key={index}>
            <div
              className={`flex items-end ${
                message.from === "bot" ? "" : "justify-end"
              }`}
            >
              <div
                className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${
                  message.from === "bot"
                    ? "order-2 items-start"
                    : "order-1 items-end"
                }`}
              >
                <div>
                  <span
                    className={`px-4 py-3 rounded-xl inline-block ${
                      message.from === "bot"
                        ? "rounded-bl-none bg-gray-100 text-gray-600"
                        : "rounded-br-none bg-blue-500 text-white"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                </div>
              </div>
              <Image
                src={message.from === "bot" ? Furia_Esports_logo : avatar_user}
                alt=""
                width={24}
                height={24}
                className={`w-6 h-6 rounded-full ${
                  message.from === "bot" ? "order-1" : "order-2"
                }`}
              />
            </div>
          </div>
        ))}

        {botTyping && (
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
              <div>
                <Image
                  src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
                  alt="Digitando..."
                  width={64}
                  height={16}
                  className="w-16 ml-6"
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div> */}

      {/* Input container */}
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            placeholder="Digite sua mensagem..."
            className="border rounded p-2 w-full"
          />
          <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              // onClick={sendMessage}
            >
              <i className="mdi mdi-arrow-right text-xl leading-none" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
