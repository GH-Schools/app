import React from "react";
import logo from "../assets/favicon.png";

function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="top flex">
        <a href="http://ghschools.online/">
          <img src={logo} alt="GH Schools Logo" width="200" height="200" />
        </a>
        <div>
          <big>More Info</big>
          <ul>
            <li>
              <a href="http://ghschools.online/">Visit our Homepage</a>
            </li>
            <li>
              <a href="https://admissions.ghschools.online/departments">
                Browse Courses
              </a>
            </li>
            <li>
              <a href="https://admissions.ghschools.online/FAQ"> Frequently Asked Questions </a>
            </li>
            <li>
              <a href="http://ghschools.online/">Visit website</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <big>Contact Us</big>
          <span>
            Achimota Accra near Achimota New Transport Terminal and Adjacent the
            Achimota ICGC
          </span>
          <span className="flex items-center">
            Phone:
            <a href="tel:+233302424909">+233 30 242 4909</a> (landline)
          </span>
          <span className="flex items-center">
            Alt. 1: <a href="tel:+233204622250">+233 20 462 2250</a>
          </span>
          <span className="flex items-center">
            Alt. 2: <a href="tel:+233277622250">+233 27 762 2250</a>
          </span>
          <span className="flex items-center">
            Alt. 3: <a href="tel:+233544622250">+233 54 462 2250</a>
          </span>

          <span className="flex items-center">
            Email:
            <a href="mailto:admissions@ghschools.online">
              admissions@ghschools.online
            </a>
          </span>
        </div>
      </div>
      <div className="bottom flex flex-col">
        <span>{`GH Schools ${new Date().getFullYear()}, all rights reserved`}</span>
        <span className="flex items-center">
          Powered by<a href="https://learnira.org/">Learnira</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
