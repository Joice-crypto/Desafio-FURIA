"use client";
import Image from "next/image";
import Furia_Esports_logo from "../../public/logos/Furia_Esports_logo.png";
import ChatBot from "./chat-bot";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export function FixedPlugin() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div>
      <Button
        color="white"
        onClick={() => setChatOpen(!chatOpen)}
        size="sm"
        className="!fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50"
      >
        <Image
          width={128}
          height={128}
          className="w-10 h-10"
          alt="Material Tailwind"
          src={Furia_Esports_logo}
        />{" "}
        Falar com chatbot
      </Button>

      <div
        className={`fixed bottom-20 right-4 w-[320px] max-h-[500px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-40
          ${
            chatOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <ChatBot />
      </div>
    </div>
  );
}
