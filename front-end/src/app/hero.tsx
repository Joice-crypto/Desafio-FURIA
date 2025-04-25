"use client";

import { IconButton, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/capa.png')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography variant="h1" color="white" className=" font-anton">
            Fala FURIA
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-3xl"
          >
            Seu copiloto no CS:GO com o sangue da FURIA.
          </Typography>
          <Typography
            variant="paragraph"
            color="white"
            className="mt-1 mb-7 font-medium uppercase"
          >
            Conecte-se conosco
          </Typography>
          <div className="gap-8 flex">
            <a target="_blank" href="https://x.com/FURIA">
              <IconButton variant="text" color="white" size="sm">
                <i className="fa-brands fa-x text-base" />
              </IconButton>
            </a>

            <a
              target="_blank"
              href="https://www.instagram.com/furiagg/?hl=pt-br"
            >
              <IconButton variant="text" color="white" size="sm">
                <i className="fa-brands fa-instagram text-base" />
              </IconButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
