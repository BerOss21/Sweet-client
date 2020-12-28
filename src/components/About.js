import React, { Fragment } from "react";
import Staff from "./about/Staff";
import Head from "./about/Head";
import Details from "./about/Details";
import Footer from "./Footer";
import "./css/all.min.css";
import "./css/templatemo-style.css";
import ScriptTag from "react-script-tag";

const About = (props) => {
  setTimeout(function () {
    sessionStorage.removeItem("success");
  }, 2000);
  console.log("session", sessionStorage.getItem("success"));
  return (
    <Fragment>
      <main>
        <Head />
        <Staff />
        <Details />
      </main>
      <Footer/>
      <ScriptTag type="text/javascript" src="js/jquery.min.js" />
      <ScriptTag type="text/javascript" src="js/parallax.min.js" />
      <ScriptTag type="text/javascript" src="js/main.js" />
    </Fragment>
  );
};

export default About;
