"use client";
import React, { useState } from "react";

export default function inicio() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true); // Ativa o formulário de login
  };

  const handleRegisterClick = () => {
    setIsLogin(false); // Ativa o formulário de cadastro
  };

  return (
    <div className=" min-h-screen absolute inset-0 bg-black opacity-500">
      {/* Background - Vídeo */}
      <video
        autoPlay
        loop
        muted
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source
          src="http://localhost:3000/image/video/cs2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Conteúdo - Formulário */}

      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
          {/* Botões de Alternância */}
          <div className="flex justify-around mb-4">
            <button
              onClick={handleLoginClick}
              className={`py-2 px-4 ${
                isLogin ? "bg-purple-500 text-white" : "text-purple-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              className={`py-2 px-4 ${
                !isLogin ? "bg-purple-600 text-white" : "text-purple-600"
              }`}
            >
              Cadastro
            </button>
          </div>

          {/* Formulário de Login */}
          {isLogin ? (
            <>
              <h2 className="text-2xl text-center mb-4">Login</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm ">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 mt-1 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm ">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-3 mt-1 border rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-500"
                >
                  Entrar
                </button>
              </form>
            </>
          ) : (
            // Formulário de Cadastro
            <>
              <h2 className="text-2xl text-center mb-4">Cadastro</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm ">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 mt-1 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm ">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 mt-1 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm ">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-3 mt-1 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-sm ">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full p-3 mt-1 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4 mt-4">
                  <label className="mt-5" htmlFor="endereco">
                    Suba seu documento de confirmação de identidade (CPF, RG,
                    CNH...)
                  </label>
                  <br />
                  <input
                    type="file"
                    className="mt-5"
                    name="documento"
                    accept="image/*,.pdf"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-500"
                >
                  Cadastrar
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
