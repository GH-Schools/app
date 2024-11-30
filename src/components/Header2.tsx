import React from "react";
import { AiFillCaretDown as MenuIcon } from "react-icons/ai";

import GHMedia from "../assets/GHMedia.png";
import { mergeClassNames } from "../utils/utilities";

function Header({ className }: { className: string }) {
  return (
    <header
      className={mergeClassNames(
        "flex flex-col w-full bg-white justify-between items-center",
        className
      )}
      style={{
        zIndex: +999
      }}
    >
      <nav className="flex gap-5 items-center justify-center w-full bg-green-700 text-white px-3 py-4 text-sm font-semibold text-center">
        <img
          src={GHMedia}
          alt={"info.name"}
          width={"50px"}
          height={"50px"}
          style={{ objectFit: "contain" }}
        />

        <a
          href="/"
          className="hover:bg-[#050] transition-colors duration-4 rounded-sm p-2"
        >
          HOME
        </a>

        <a
          href="/portal/admissions?tab=apply"
          className="hover:bg-[#050] transition-colors duration-4 rounded-sm p-2"
        >
          ADMISSIONS
        </a>

        <a
          href="/portal"
          className="hover:bg-[#050] transition-colors duration-4 rounded-sm p-2"
        >
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
        className="hidden sm:hidden hover:hidden opacity-0 hover:opacity-100 flex-col items-center justify-center px-7 pt-3 pb-3 bg-white absolute top-full shadow-lg w-full text-sm font-semibold text-center"
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
