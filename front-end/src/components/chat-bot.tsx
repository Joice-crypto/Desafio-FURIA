import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Furia_Esports_logo from "../../public/logos/Furia_Esports_logo.png";
import avatar_user from "../../public/image/avatarUser.jpg";
import { api } from "@/lib/api";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<
    Array<{ from: string; text: string }>
  >([]);
  const [botTyping, setBotTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendClick = async () => {
    const inputMessage = inputRef.current?.value || "";
    if (!inputMessage) return;

    // Adiciona a mensagem do usuário à interface
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "user", text: inputMessage },
    ]);

    inputRef.current!.value = "";

    setBotTyping(true);

    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post(
        "/chat",
        { message: inputMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: data.response },
      ]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      // Remove a animação de "digitando" do bot
      setBotTyping(false);
    }
  };

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-96 bg-white">
      {/* Messages container */}
      <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {messages.map((message, index) => (
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
                        : "rounded-br-none bg-purple-800 text-white"
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
      </div>

      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Diga alguma coisa..."
            autoComplete="off"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
            className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-purple-800 rounded-full py-2"
            ref={inputRef}
          />
          <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-purple-500 hover:bg-purple-600 focus:outline-none"
              onClick={handleSendClick}
            >
              <i className="mdi mdi-arrow-right text-xl leading-none" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
