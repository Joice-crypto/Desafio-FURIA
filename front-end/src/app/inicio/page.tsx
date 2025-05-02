"use client";
import React, { useState } from "react";
import { FormEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import router from "next/router";
import Cookie from "js-cookie";
import { ValidacaoDocumento } from "../validarDoc";
import { error } from "console";

export default function inicio() {
  const [isLogin, setIsLogin] = useState(true);
  const [validando, setValidando] = useState(false);
  const [textoReconhecido, setTextoReconhecido] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  // Ativa o form de login
  const handleLoginClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsLogin(true);
    event.preventDefault();
  };
  //ativa o from de cadastro
  const handleRegisterClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsLogin(false);
    event.preventDefault();
  };

  // funcão que vai validar o documento
  async function handleValidarDocumento(uploadFormData: FormData) {
    setValidando(true);
    setErro("");

    try {
      const fileToValidate = uploadFormData.get("file");
      const nome = uploadFormData.get("nome");

      // console.log(nome);
      if (!(fileToValidate instanceof File)) {
        throw new Error("Por favor, selecione um arquivo válido");
      }

      if (fileToValidate.size > 5 * 1024 * 1024) {
        throw new Error("Arquivo muito grande (máximo 5MB)");
      }

      if (typeof nome !== "string") {
        throw new Error("Nome inválido ou ausente.");
      }

      const formData = new FormData();
      formData.append("file", fileToValidate);
      formData.append("nome", nome);

      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });

      const { data } = await api.post("/validarDoc", formData);

      // Processamento da resposta do Mistral
      const respostaValidacao = data.choices?.[0]?.message?.content;
      setTextoReconhecido(
        respostaValidacao || "Não foi possível validar o documento"
      );

      return respostaValidacao;
    } catch (err) {
      console.error(err);
      setErro("Erro ao validar documento");
      throw err;
    } finally {
      setValidando(false);
    }
  }

  async function handleCadastroClick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    try {
      const formData = new FormData(event.currentTarget);
      const fileToUpload = formData.get("documento");

      if (!(fileToUpload instanceof File)) {
        throw new Error("Selecione um documento válido");
      }

      // 1. Validação do documento
      const uploadFormData = new FormData();
      uploadFormData.append("file", fileToUpload);
      uploadFormData.append("nome", formData.get("nome")?.toString() || "");

      const resultadoValidacao = await handleValidarDocumento(uploadFormData);

      let documento = "";
      try {
        const uploadResponse = await api.post("/upload", uploadFormData);

        if (uploadResponse.data.fileUrl) {
          documento = uploadResponse.data.fileUrl;
        } else {
          console.error("Erro ao fazer upload do documento.");
        }
      } catch (err) {
        console.error("Erro ao fazer upload:", err);
      }

      // 2. Se a validação for bem-sucedida, prossegue com cadastro
      const { data } = await api.post("/cadastro", {
        nome: formData.get("nome"),
        email: formData.get("email"),
        senha: formData.get("senha"),
        documento: documento,
      });

      router.push("/inicio");
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setErro("Erro ao realizar cadastro");
    }
  }

  // async function handleCadastroClick(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   const formData = new FormData(form);
  //   const fileToUpload = formData.get("documento");
  //   let documento = "";

  //   if (fileToUpload instanceof File) {
  //     const uploadFormData = new FormData();
  //     uploadFormData.append("file", fileToUpload);
  //     uploadFormData.append(
  //       "nomeUsuario",
  //       formData.get("nome")?.toString() || ""
  //     );

  //     try {
  //       const uploadResponse = await api.post("/upload", uploadFormData);

  //       if (uploadResponse.data.fileUrl) {
  //         documento = uploadResponse.data.fileUrl;
  //         await handleValidarDocumento(uploadFormData);
  //       } else {
  //         console.error("Erro ao fazer upload do documento.");
  //       }
  //     } catch (err) {
  //       console.error("Erro ao fazer upload:", err);
  //     }
  //   }

  //   const token = Cookie.get("token");

  //   await api.post(
  //     "/cadastro",
  //     {
  //       documento,
  //       nome: formData.get("nome"),
  //       email: formData.get("email"),
  //       senha: formData.get("senha"),
  //     }
  //     // {
  //     //   headers: {
  //     //     Authorization: `Bearer ${token}`,
  //     //   },
  //     // }
  //   );

  //   router.push("/inicio");
  // }

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
        Seu navegador não suporta o video
      </video>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
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
            <>
              <h2 className="text-2xl text-center mb-4">Cadastro</h2>
              <form onSubmit={handleCadastroClick}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm ">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="nome"
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
                    name="email"
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
                    name="senha"
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
                    name="confirmar-senha"
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
                    accept=".pdf"
                  />
                </div>
                <ValidacaoDocumento
                  status={
                    validando
                      ? "loading"
                      : textoReconhecido
                      ? "success"
                      : erro
                      ? "error"
                      : "idle"
                  }
                  mensagem={textoReconhecido || erro}
                />

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
