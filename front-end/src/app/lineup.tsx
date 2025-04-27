"use client";

import React from "react";
import Image from "next/image";
import fallen from "../../public/image/jogadores/fallen-furia.webp";
import molodoy from "../../public/image/jogadores/MOLODOY-2.webp";
import yekindar from "../../public/image/jogadores/YEKINDAR.webp";
import chelo from "../../public/image/jogadores/chelo-cs2-reserva.webp";
import kscerato from "../../public/image/jogadores/KSCERATO.webp";
import yuriih from "../../public/image/jogadores/yuurih.jpeg";
import skullz from "../../public/image/jogadores/skullz-furia-reserva.avif";

import { Button, Typography, Card, CardBody } from "@material-tailwind/react";

export function LineUP() {
  return (
    <section
      id="Jogadores"
      className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 py-20"
    >
      <Button color="gray" className="mb-3" size="sm">
        Line-up
      </Button>
      <Typography variant="h3" className="text-center" color="blue-gray">
        Nossa line-up do CS:GO 2
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 mb-8 w-full text-center font-normal !text-gray-500 max-w-4xl"
      >
        Onde o talento encontra a fúria: conheça os jogadores que transformam
        cada partida em espetáculo.
      </Typography>
      <div className="mt-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <div className="!border-b  border-blue-gray-100 mb-6">
          <Card shadow={false} className="p-0">
            <CardBody className="p-0 pb-5">
              <div className="w-full mb-4 h-[149px] ">
                <Image
                  width={768}
                  height={768}
                  src={fallen}
                  className="w-10/12 md:w-full object-cover h-full rounded-lg"
                  alt=""
                />
              </div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-6 !text-gray-900"
              >
                Gabriel "FalleN" Toledo
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="!border-b md:border-none border-blue-gray-100 mb-6">
          <Card shadow={false} className="p-0">
            <CardBody className="p-0 pb-5">
              <div className="w-full mb-4 h-[149px] ">
                <Image
                  width={768}
                  height={768}
                  src={kscerato}
                  className="w-10/12 md:w-full object-cover h-full rounded-lg"
                  alt=""
                />
              </div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-6 !text-gray-900"
              >
                Kaike "KSCERATO" Cerato
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="!border-b md:border-none border-blue-gray-100 mb-6">
          <Card shadow={false} className="p-0">
            <CardBody className="p-0 pb-5">
              <div className="w-full mb-4 h-[149px] ">
                <Image
                  width={768}
                  height={768}
                  src={molodoy}
                  className="w-10/12 md:w-full object-cover h-full rounded-lg"
                  alt=""
                />
              </div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-6 !text-gray-900"
              >
                Danil "molodoy" Golubenko
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="!border-b md:border-none border-blue-gray-100 mb-6">
          <Card shadow={false} className="p-0">
            <CardBody className="p-0 pb-5">
              <div className="w-full mb-4 h-[149px] ">
                <Image
                  width={768}
                  height={768}
                  src={yekindar}
                  className="w-10/12 md:w-full object-cover h-full rounded-lg"
                  alt=""
                />
              </div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-6 !text-gray-900"
              >
                Mareks "YEKINDAR" Gaļinskis
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="!border-b md:border-none border-blue-gray-100 mb-6">
          <Card shadow={false} className="p-0">
            <CardBody className="p-0 pb-5">
              <div className="w-full mb-4 h-[149px] ">
                <Image
                  width={768}
                  height={768}
                  src={yuriih}
                  className="w-10/12 md:w-full object-cover h-full rounded-lg"
                  alt=""
                />
              </div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-6 !text-gray-900"
              >
                Yuri "yuurih" Boian
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>

      <Typography variant="h4" className=" !text-gray-900">
        Reservas
      </Typography>
      <div className="mt-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="!border-b md:border-none border-blue-gray-100 mb-6">
          <Card shadow={false} className="p-0">
            <CardBody className="p-0 pb-5">
              <div className="w-full mb-4 h-[149px] ">
                <Image
                  width={768}
                  height={768}
                  src={chelo}
                  className="w-10/12 md:w-full object-cover h-full rounded-lg"
                  alt=""
                />
              </div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-6 !text-gray-900"
              >
                Marcelo "chelo" Cespedes
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="!border-b md:border-none border-blue-gray-100 mb-6">
          <Card shadow={false} className="p-0">
            <CardBody className="p-0 pb-5">
              <div className="w-full mb-4 h-[149px] ">
                <Image
                  width={768}
                  height={768}
                  src={skullz}
                  className="w-10/12 md:w-full object-cover h-full rounded-lg"
                  alt=""
                />
              </div>
              <Typography
                variant="h6"
                className="leading-[45px] mb-6 !text-gray-900"
              >
                Felipe "skullz" Medeiros
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default LineUP;
