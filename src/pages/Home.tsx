import React, { useState } from "react";
import "./Home.scss";
import Button from "../components/common/Button";
import logo from "../assets/favicon.png";

function Home() {
  const [animate] = useState(false);

  const schools = [
    { name: "Fashion School", logo, textColor: "text-black" },
    { name: "Catering School", logo, textColor: "text-black" },
    { name: "Cosmetology School", logo, textColor: "text-black" },
    { name: "Media School", logo, textColor: "text-white" },
    { name: "Technology School", logo, textColor: "text-white" },
  ];

  return (
    <main className="" style={{}}>
      <section className="tv relative min-h-screen md:min-h-screen w-screen">
        <div className="step step-3"></div>

        <div className="flex flex-col md:flex-row items-stretch justify-start step step-2">
          {schools.map((info, index) => (
            <div
              key={index}
              className={
                "flex flex-row md:flex-col gap-3 md:gap-10 justify-between md:max-w-[350px] items-center flex-none md:flex-initial md:justify-end py-6 md:py-10 px-6 min-h-64 md:min-h-[unset] md:h-full flex-grow w-full self-end shadow-lg"
              }
              style={{}}
            >
              <img
                src={info.logo}
                alt={info.name}
                width={"100px"}
                height={"100px"}
                style={{ objectFit: "contain" }}
              />

              <Button text="Get Started" className="my-4 mx-4" style={{}} href="/portal/admissions"/>

              <h2
                className={`${info.textColor} inline-block md:h-[4.5rem] uppercase text-center font-bold text-lg sm:text-2xl`}
              >
                {info.name}
              </h2>
            </div>
          ))}
        </div>

        <div
          className={`${
            animate ? "animate" : ""
          } flex flex-col items-center justify-center step step-1`}
        >
          <img
            src={logo}
            alt={"logo"}
            width={"200px"}
            height={"200px"}
            style={{ objectFit: "contain" }}
          />
          <h1 className="font-bold text-3xl text-white uppercase my-4">GH Schools</h1>
          <p className="text-white">Your GH Schools Journy starts here</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
