"use client";
import { useState } from "react";

import React from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

export function Quiz() {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    cpf: "",
    interesses: "",
    atividades: "",
  });

  const [iaResponse, setIaResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para atualizar os campos do formulário
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar os dados para a IA
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `
      Me ajude a entender este fã de eSports com base nas seguintes informações:
      Nome: ${formData.nome}
      Endereço: ${formData.endereco}
      CPF: ${formData.cpf}
      Interesses: ${formData.interesses}
      Atividades: ${formData.atividades}
      
      Faça um resumo breve sobre ele e me diga que tipo de ações ou campanhas podemos oferecer para esse fã.
      `;

      // Aqui você chama a IA
      const response = await fetch("/api/mistral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setIaResponse(data.resultado); // Ajuste o campo dependendo de como a IA retorna
    } catch (error) {
      console.error("Erro ao enviar para IA:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="Quiz"
      className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 py-20"
    >
      <Button color="gray" className="mb-3" size="sm">
        Quiz
      </Button>
      <Typography variant="h3" className="text-center" color="blue-gray">
        Qual tipo de #FURIOSO você é?
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 mb-8 w-full text-center font-normal !text-gray-500 max-w-4xl"
      >
        Preencha nosso quiz abaixo! Nossa IA vai analisar seu perfil e revelar
        se você é um verdadeiro MVP da FURIA!
      </Typography>
      <div className="mx-auto pt-5 max-w-screen-md flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-96 gap-5  max-w-lg flex-col"
        >
          <label htmlFor="nome">Nome completo:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <label htmlFor="endereco">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <div className="mb-4">
            <label htmlFor="jogos" className="block  mb-2">
              Quais desses jogos você mais acompanha:
            </label>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogo"
                  value="Rocket League"
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">Rocket League</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogo"
                  value="League of Legends"
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">League of Legends</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogo"
                  value="CS:GO2"
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">CS:GO2</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogo"
                  value="Valorant"
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">Valorant</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogo"
                  value="Rainbow Six"
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">Rainbow Six</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogo"
                  value="Apex Legends"
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">Apex Legends</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="jogos" className="block mb-2">
              Você já foi a algum evento presencial de e-sports?
            </label>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="jogo"
                  value="Sim"
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Sim</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="jogo"
                  value="ainda nao"
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Não, mas quero ir</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="jogo"
                  value="nao"
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Não tenho interesse</span>
              </label>
            </div>
            <div className="mb-4 mt-4">
              <label htmlFor="endereco">
                Qual evento de e-sports mais marcou você nos últimos anos?
                Descreva sua experiência.
              </label>
              <textarea
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="border p-2 mt-2 rounded w-full"
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
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Quiz;
