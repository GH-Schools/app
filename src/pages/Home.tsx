import React, { useState } from "react";
import "./Home.scss";
import Button from "../components/common/Button";
import logo from "../assets/favicon.png";

function Home() {
  const [animate] = useState(false);

  const schools = [
    {
      name: "Fashion School",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis tenetur quas architecto sunt inventore maxime aut dignissimos unde. Minus necessitatibus ad, fugiat ipsum laborum dolorum accusamus est id blanditiis exercitationem!",
      logo,
      textColor: "text-white",
    },
    {
      name: "Catering School",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis tenetur quas architecto sunt inventore maxime aut dignissimos unde. Minus necessitatibus ad, fugiat ipsum laborum dolorum accusamus est id blanditiis exercitationem!",
      logo,
      textColor: "text-black",
    },
    {
      name: "Cosmetology School",
      description:
        "If you have the personal passion for improving people’s confidence and appearance, our industry standard course is right for you: make up & eye enhancement, manicure & pedicure, nail technology, salon & spa management, hair technology, body enhancement",
      logo,
      textColor: "text-black",
    },
    {
      name: "Media School",
      description:
        'GH Media School was established by Mr. Leslie Addo-Listowell, out of a mother company called "Media Tribe Studio 233", a multimedia company with a special focus on the production of branded and non-branded content for TV Stations across the country.',
      logo,
      textColor: "text-white",
    },
    {
      name: "Technology School",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis tenetur quas architecto sunt inventore maxime aut dignissimos unde. Minus necessitatibus ad, fugiat ipsum laborum dolorum accusamus est id blanditiis exercitationem!",
      logo,
      textColor: "text-white",
    },
  ];

  return (
    <main className="" style={{}}>
      {/* <header className="flex md:hidden sticky p-3 bg-slate-600">h</header> */}
      <section className="tv relative min-h-screen md:min-h-screen w-screen">
        <div className="step step-3"></div>

        <div className="flex flex-col md:flex-row items-stretch justify-start step step-2">
          {schools.map((info, index) => (
            <div
              key={index}
              className={
                "school flex flex-col md:flex-col gap-3 md:gap-10 justify-between md:max-w-[350px] items-center flex-none md:flex-initial md:justify-end py-6 md:py-10 px-6 min-h-52 md:min-h-[unset] md:h-full flex-grow w-full self-end shadow-lg"
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

              <Button
                text="Get Started"
                className="my-4 mx-4 hidden md:flex desktop text-sm"
                style={{}}
                href="/portal/admissions"
              />

              <div className="flex flex-col items-center gap-2">
                <h2
                  className={`${info.textColor} inline-block md:h-[4.5rem] uppercase text-center font-bold text-lg md:text-2xl`}
                >
                  {info.name}
                </h2>

                <p
                  className={`description ${info.textColor} text-sm font-semibold text-center line-clamp-5 max-w-80`}
                >
                  {info.description}
                </p>

                <Button
                  text="Get Started"
                  className="my-4 flex md:hidden mobile text-sm max-w-56 md:max-w-[unset]"
                  style={{}}
                  href="/portal/admissions"
                />
              </div>
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
          <h1 className="font-bold text-3xl text-white uppercase my-4">
            GH Schools
          </h1>
          <p className="text-white">Your GH Schools journey starts here</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
