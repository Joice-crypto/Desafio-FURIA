import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Furia_Esports_logo from "../../public/logos/Furia_Esports_logo.png";
import avatar_user from "../../public/image/avatarUser.jpg";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [botTyping, setBotTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hello world!" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prompts = [
    ["hi", "hey", "hello", "good morning", "good afternoon"],
    ["how are you", "how is life", "how are things"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you"],
    [
      "your name please",
      "your name",
      "may i know your name",
      "what is your name",
      "what call yourself",
    ],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice"],
    ["bye", "good bye", "goodbye", "see you later"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["no", "not sure", "maybe", "no thanks"],
    [""],
    ["haha", "ha", "lol", "hehe", "funny", "joke"],
    [
      "flip a coin",
      "heads or tails",
      "tails or heads",
      "head or tails",
      "head or tail",
      "tail or heads",
      "tail or head",
    ],
    ["beer", "buy me a beer", "want a beer"],
  ];

  const replies = [
    ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
    [
      "Fine... how are you?",
      "Pretty well, how are you?",
      "Fantastic, how are you?",
    ],
    [
      "Nothing much",
      "About to go to sleep",
      "Can you guess?",
      "I don't know actually",
    ],
    ["I am infinite"],
    ["I am just a bot", "I am a bot. What are you?"],
    ["The one true God, JavaScript"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV"],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["Bye", "Goodbye", "See you later"],
    ["Sushi", "Pizza"],
    ["Bro!"],
    ["Great question"],
    ["That's ok", "I understand", "What do you want to talk about?"],
    ["Please say something :("],
    ["Haha!", "Good one!"],
    ["Heads", "Tails"],
    [
      'You can buy me a beer at: <a href="https://www.buymeacoffee.com/scottwindon" target="_blank" style="text-decoration:underline;">https://www.buymeacoffee.com/scottwindon</a>',
    ],
  ];

  const alternative = [
    "Same",
    "Go on...",
    "Bro...",
    "Try again",
    "I'm listening...",
    "I don't understand :/",
  ];
  const coronavirus = [
    "Please stay home",
    "Wear a mask",
    "Fortunately, I don't have COVID",
    "These are uncertain times",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, botTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const compare = (
    promptsArray: string[][],
    repliesArray: string[][],
    string: string
  ) => {
    let reply = "";
    let replyFound = false;

    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          const replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) break;
    }

    if (!replyFound) {
      for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
          if (levenshtein(promptsArray[x][y], string) >= 0.75) {
            const replies = repliesArray[x];
            reply = replies[Math.floor(Math.random() * replies.length)];
            replyFound = true;
            break;
          }
        }
        if (replyFound) break;
      }
    }

    return reply;
  };

  const levenshtein = (s1: string, s2: string) => {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    return (
      (longerLength - editDistance(longer, shorter)) /
      parseFloat(longerLength.toString())
    );
  };

  const editDistance = (s1: string, s2: string) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };

  const output = (input: string) => {
    let product;

    // Process input
    let text = input
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/[\d]/gi, "")
      .trim();
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");

    const foundReply = compare(prompts, replies, text);
    if (foundReply) {
      product = foundReply;
    } else if (text.match(/thank/gi)) {
      product = "You're welcome!";
    } else if (text.match(/(corona|covid|virus)/gi)) {
      product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    addChat(input, product);
  };

  const addChat = (input: string, product: string) => {
    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: input }]);

    // Fake delay for bot typing
    setTimeout(() => {
      setBotTyping(true);
    }, 1000);

    // Add bot response after delay
    setTimeout(() => {
      setBotTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: product }]);
    }, (product.length / 10) * 1000 + (Math.floor(Math.random() * 2000) + 1500));
  };

  const updateChat = (target: HTMLInputElement) => {
    if (target.value.trim()) {
      output(target.value.trim());
      target.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateChat(e.currentTarget);
    }
  };

  const handleSendClick = () => {
    if (inputRef.current) {
      updateChat(inputRef.current);
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
            onKeyDown={handleKeyDown}
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
