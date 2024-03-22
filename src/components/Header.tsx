import React from "react";

function Header() {
  return (
    <header className="flex flex-col w-full bg-white justify-between items-center">
      <div
        className="flex items-center justify-center w-full text-black px-3 py-4"
        style={{
          backgroundImage: "linear-gradient(to right, red, yellow, green)",
        }}
      >
        <h1 className="text-2xl font-bold">GH SCHOOLS</h1>
      </div>
      <div className="flex gap-6 items-center justify-center w-full bg-green-700 text-white px-3 py-4">
        <a href="/">HOME</a>
        <a href="/app/admissions">ADMISSIONS</a>
        <a href="/dashboard">STUDENT PORTAL</a>
        <a href="/courses">OUR COURSES</a>
        <a href="/fees">OUR FEES</a>
      </div>
    </header>
  );
}

export default Header;
