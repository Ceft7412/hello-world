"use client";
import React from "react";

function Footer() {
  return (
    <footer className="w-full footer h-30 sm:h-40 text-white bg-gray-950 min-w-80">
      <div className="p-6 sm:px-32 w-full h-full footer__flex flex flex-col sm:flex-row justify-between items-center">
        <div className="flex gap-5">
          <a href="https://www.linkedin.com/in/cedrick-caceres-22b8612b4/">
            <img
              src="https://skillicons.dev/icons?i=linkedin"
              className="w-10"
              alt="LinkedIn"
            />
          </a>
          <a href="https://github.com/Ceft7412">
            <img
              src="https://skillicons.dev/icons?i=github"
              className="w-10"
              alt="Github"
            />
          </a>
        </div>
        <p className="text-white mt-4">
          &copy; {new Date().getFullYear()} Cedrick Caceres
        </p>
      </div>
    </footer>
  );
}

export default Footer;
