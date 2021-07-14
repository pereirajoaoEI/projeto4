/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <AuthNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Plataforma de Gestão de Requisitos
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Projeto baseado na Blockchain Hyperledger Sawtooth com UI React
                <br></br> Grupo: João Pereira e João Silva <br></br>{" "}
                Coordenador: Professor Miguel Cruz
                <br></br>UC: Projeto IV
                <br></br>
                <a
                  href="https://www.ipvc.pt/estg/"
                  className="text-blueGray-600"
                  target="_blank"
                >
                  IPVC-ESTG
                </a>
              </p>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
        />
      </section>
    </>
  );
}
