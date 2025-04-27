import React from "react";

export default function inicio() {
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
          src="http://localhost:3000/image/video/videocs2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Conteúdo - Formulário */}

      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
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
              <label htmlFor="password" className="block text-sm font-semibold">
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
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
