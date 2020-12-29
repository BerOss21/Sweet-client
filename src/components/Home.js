import React,{Fragment, useState} from "react";
import Head from './main/Head';
import Gallery from './main/Gallery';
import About from './main/About';
import Footer from "./Footer";
import "./css/all.min.css";
import "./css/templatemo-style.css";
import ScriptTag from "react-script-tag";


const Home=(props)=>{
    const [category,setCategory]=useState("");
    const getCategory=(category)=>{
        setCategory(category)
    }
    console.log("isadminSession",sessionStorage.isAdmin);
    console.log("isadminlocal",localStorage.isAdmin);
    return(
        <Fragment>
            <main>
                <Head getCategory={getCategory}/>
                <Gallery category={category}/>
                <About/>
            </main>
            <Footer/>
            <ScriptTag type="text/javascript" src="js/jquery.min.js"/>
            <ScriptTag type="text/javascript" src="js/parallax.min.js"/>
            <ScriptTag type="text/javascript" src="js/main.js"/>
        </Fragment>
    )
}

export default Home;