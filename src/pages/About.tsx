import React from "react";
import Navbar from "../component/navbar/Navbar";

function About() {
  return (
    <div>
      <Navbar />
      <div className="text-white text-2xl flex flex-col gap-y-2">
        <p>This is full-stack project for practising</p>
        <p>
          Until i have portofolio, cv or something a professional guy would
          have,
        </p>
        <p>
          Check my github for the application code back/front &nbsp;-&nbsp;
          <a
            href="https://github.com/Yossef-Elshafey"
            rel="noreferrer"
            target="_blank"
            className="text-cyan-500"
          >
            Here
          </a>
          <br />
        </p>
      </div>
    </div>
  );
}

export default About;
