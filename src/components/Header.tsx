import React from "react";
import { AiFillCaretDown as MenuIcon } from "react-icons/ai";

function Header() {
  return (
    <header className="flex flex-col w-full bg-white justify-between items-center relative">
      <div
        className="flex items-center justify-center w-full text-black px-3 py-4"
        style={{
          backgroundImage: "linear-gradient(to right, red, yellow, green)",
        }}
      >
        <h1 className="text-2xl font-bold">GH SCHOOLS</h1>
      </div>

      <nav className="flex gap-5 items-center justify-center w-full bg-green-700 text-white px-3 py-4 text-sm font-semibold text-center">
        <a href="/" className="hover:bg-[#050] transition-colors duration-4 rounded-sm p-2">
          HOME
        </a>

        <a
          href="/portal/admissions?tab=apply"
          className="hover:bg-[#050] transition-colors duration-4 rounded-sm p-2"
        >
          ADMISSIONS
        </a>

        <a href="/portal" className="hover:bg-[#050] transition-colors duration-4 rounded-sm p-2">
          STUDENT PORTAL
        </a>

        <a
          href="/courses"
          className="hidden sm:inline-block hover:bg-[#050] transition-colors duration-4 rounded-sm p-2"
        >
          OUR COURSES
        </a>

        <a
          href="/fees"
          className="hidden sm:inline-block hover:bg-[#050] transition-colors duration-4 rounded-sm p-2"
        >
          OUR FEES
        </a>

        <button className="flex items-center gap-2 sm:hidden hover:bg-[#050] transition-colors duration-4 rounded-sm p-2">
          <span>MORE</span>
          <MenuIcon />
        </button>
      </nav>

      <div
        id="mobile-drop-down-menu"
        className="flex sm:hidden hover:flex opacity-0 hover:opacity-100 flex-col items-center justify-center px-7 pt-3 pb-3 bg-white absolute top-full shadow-lg w-full text-sm font-semibold text-center"
      >
        <a
          href="/portal"
          className="block w-full py-4 hover:bg-[#eeeeeeee] rounded-sm"
        >
          STUDENT PORTAL
        </a>
        <a
          href="/courses"
          className="block w-full py-4 hover:bg-[#eeeeeeee] rounded-sm"
        >
          OUR COURSES
        </a>
        <a
          href="/fees"
          className="block w-full py-4 hover:bg-[#eeeeeeee] rounded-sm"
        >
          OUR FEES
        </a>
      </div>
    </header>
  );
}

export default Header;
