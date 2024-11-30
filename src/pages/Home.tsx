import React, { useState } from "react";

import GHMedia from "../assets/GHMedia.png";
import GHFashion from "../assets/GHFashion.png";
import GHCatering from "../assets/GHCatering.png";
import GHCosmetology from "../assets/GHCosmetolgy.png";
import GHTechnology from "../assets/GHTechnology.png";
import Header from "../components/Header2";
import Button from "../components/common/Button";

function Home() {
  const schools = [
    {
      name: "Fashion School",
      description: "",
      logo: GHFashion,
      textColor: "text-white",
    },
    {
      name: "Catering School",
      description: "",
      logo: GHCatering,
      textColor: "text-black",
    },
    {
      name: "Cosmetology School",
      description: "",
      logo: GHCosmetology,
      textColor: "text-black",
    },
    {
      name: "Media School",
      description: "",
      logo: GHMedia,
      textColor: "text-white",
    },
    {
      name: "Technology School",
      description: "",
      logo: GHTechnology,
      textColor: "text-white",
    },
  ];

  return (
    <main className="relative" style={{}}>
      <Header className="absolute top-0" />
      <section className="flex flex-col relative min-h-screen md:min-h-screen w-screen justify-center items-start p-6 bg-black">
        <div className="max-w-2xl flex flex-col gap-5 mx-auto text-white">
          <h1 className="font-bold text-4xl">Sept. 2024/25 Admissions</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            magnam placeat eius autem corrupti iure. Inventore sint hic
            voluptates asperiores! Maxime eius odit sunt quo accusantium. Veniam
            quibusdam alias est.
          </p>
          <div className="flex gap-4">
            <Button
              text="Buy Form"
              className="my-4 hidden md:flex text-sm bg-red-500 text-white rounded-md"
              style={{}}
              href="portal/admissions?tab=apply"
            />
            <Button
              text="Admission Login"
              className="my-4 hidden md:flex text-sm border border-white text-white rounded-md"
              style={{ backgroundColor: "black" }}
              href="portal/admissions"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
