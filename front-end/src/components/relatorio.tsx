import React, { useState } from "react";

interface RelatorioIAProps {
  texto: string;
}

const RelatorioIA: React.FC<RelatorioIAProps> = ({ texto }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!texto || !isVisible) return null;

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-8 p-6 bg-white shadow-xl rounded-2xl border border-gray-200 ${
        isMinimized ? "h-16" : "h-80"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Relatório Gerado pela IA
        </h2>
        <div className="space-x-2">
          <button
            onClick={handleMinimize}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {isMinimized ? "Expandir" : "Minimizar"}
          </button>
          <button
            onClick={handleClose}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Fechar
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="overflow-y-auto max-h-60">
          <p className="text-gray-800 whitespace-pre-line leading-relaxed">
            {texto}
          </p>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500 italic">
        *Este relatório foi gerado com base nas suas respostas. Aproveite as
        dicas e continue apoiando a FURIA! 🐾
      </div>
    </div>
  );
};

export default RelatorioIA;
