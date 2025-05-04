"use client";
import { useState } from "react";

import React from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { api } from "@/lib/api";
import RelatorioIA from "@/components/relatorio";

export function Quiz() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    jogos: [] as string[],
    evento: "",
    eventoDesc: "",
    produtoFuria: "",
    linkPerfilFaceit: "",
  });

  const [iaResponse, setIaResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, jogos: [...prevData.jogos, value] };
      } else {
        return {
          ...prevData,
          jogos: prevData.jogos.filter((jogo) => jogo !== value),
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const { data } = await api.post(
        "/quiz",
        {
          nome: formData.nome,
          endereco: formData.endereco,
          cpf: formData.cpf,
          jogos: formData.jogos,
          evento: formData.evento,
          eventoDesc: formData.eventoDesc,
          produtoFuria: formData.produtoFuria,
          linkPerfilFaceit: formData.linkPerfilFaceit,
          data: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data: iaData } = await api.get("/quizResult", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIaResponse(iaData.data);
      console.log("Relatório gerado:", iaData.data);
    } catch (error) {
      console.error("Erro ao enviar quiz:", error);
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
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            name="endereco"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            name="cpf"
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
                  name="jogos"
                  value="Rocket League"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">Rocket League</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogos"
                  value="League of Legends"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">League of Legends</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogos"
                  value="CS:GO2"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">CS:GO2</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogos"
                  value="Valorant"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">Valorant</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogos"
                  value="Rainbow Six"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">Rainbow Six</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="jogos"
                  value="Apex Legends"
                  className="form-checkbox text-blue-500"
                  onChange={handleCheckboxChange}
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
                  name="evento"
                  value="sim"
                  required
                  onChange={handleChange}
                  checked={formData.evento === "sim"}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Sim</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="evento"
                  value="ainda nao"
                  required
                  onChange={handleChange}
                  checked={formData.evento === "ainda nao"}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Não, mas quero ir</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="evento"
                  value="nao"
                  onChange={handleChange}
                  checked={formData.evento === "nao"}
                  required
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
                name="eventoDesc"
                onChange={handleChange}
                className="border p-2 mt-2 rounded w-full"
                required
              />
            </div>
            <label htmlFor="endereco">
              Você ja adquiriu algum produto da FURIA? Qual?
            </label>
            <input
              type="text"
              name="produtoFuria"
              onChange={handleChange}
              className="border p-2  w-full mt-3 rounded"
              required
            />
            <div className="mb-4 mt-5">
              <label htmlFor="endereco">
                Por favor, envie o link do seu perfil Faceit. Usaremos este link
                apenas para validar que você joga CS:GO2
              </label>
              <input
                type="text"
                name="linkPerfilFaceit"
                onChange={handleChange}
                className="border p-2 w-full mt-3 rounded"
                required
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
        <RelatorioIA texto={iaResponse} />
      </div>
    </section>
  );
}

export default Quiz;
