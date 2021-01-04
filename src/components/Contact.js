import React, { Fragment, useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import "./css/all.min.css";
import "./css/templatemo-style.css";
import ScriptTag from "react-script-tag";
import {Spin,message} from "antd";

const Contact = (props) => {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [msg,setMessage]=useState("");
  const [subject,setSubject]=useState("");
  const [success,setSuccess]=useState("");
  const [spinning,setSpinning]=useState(false);

  const handleSubmit=e=>{
      setSpinning(true)
      e.preventDefault();
      axios.post("/api/send",{
        name,
        email,
        msg,
        subject  
      }).then(res=>{
          console.log("response contact",res);
          setSuccess(res.data.success);     
          setMessage("");
          setName("");
          setSubject("");
          setEmail("");
          setSpinning(false);
          message.success("Message sent")
         
      }).catch(err=>{
          console.log("error",err)
      })

  }

  const handleName=e=>{
    e.preventDefault();
    setName(e.target.value);
  }

  const handleEmail=e=>{
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handleSubject=e=>{
    e.preventDefault();
    setSubject(e.target.value);
  }

  const handlemsg=e=>{
    e.preventDefault();
    setMessage(e.target.value);
  }

  return (
    <Fragment>
      <div>
        <header className="row tm-welcome-section mx-auto">
          <h2 className="col-12 text-center tm-section-title">Contact Us </h2>
          <p className="col-12 text-center">
            Donec sed orci fermentum, convallis lacus id, tempus elit. Sed eu
            neque accumsan, porttitor arcu a, interdum est. Donec in risus eu
            ante. Donec sed orci fermentum, convallis lacus id, tempus elit. Sed
            eu neque accumsan, porttitor arcu a, interdum est. Donec in risus eu
            ante.
          </p>
        </header>
        <div className="tm-container-inner-2 tm-contact-section">
          <div className="row">
            <div className="col-md-6">
            <Spin tip="Loading..." spinning={spinning}>
              <form action method="post" onSubmit={handleSubmit} className="tm-contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={handleName}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    onChange={handleEmail}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    required
                    onChange={handleSubject}
                    value={subject}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows={5}
                    name="msg"
                    className="form-control"
                    placeholder="message"
                    required
                    onChange={handlemsg}
                    value={msg}
                  />
                </div>
                <div className="form-group tm-d-flex">         
                  <button
                    type="submit"
                    className="tm-btn tm-btn-default tm-btn-right"
                  >
                    Send
                  </button>
                </div>
              </form>
              </Spin>
            </div>
            
            <div className="col-md-6">
              <div className="tm-address-box">
                <h4 className="tm-info-title tm-text-success">Our Address</h4>
                <address>
                  180 Orci varius natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus 10550
                </address>
                <a href="tel:080-090-0110" className="tm-contact-link">
                  <i className="fas fa-phone tm-contact-icon" />
                  080-090-0110
                </a>
                <a href="mailto:info@company.co" className="tm-contact-link">
                  <i className="fas fa-envelope tm-contact-icon" />
                  info@company.co
                </a>
                <div className="tm-contact-social">
                  <a
                    href="https://fb.com/templatemo"
                    className="tm-social-link"
                  >
                    <i className="fab fa-facebook tm-social-icon" />
                  </a>
                  <a href="#" className="tm-social-link">
                    <i className="fab fa-twitter tm-social-icon" />
                  </a>
                  <a href="#" className="tm-social-link">
                    <i className="fab fa-instagram tm-social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* How to change your own map point
	1. Go to Google Maps
	2. Click on your location point
	3. Click "Share" and choose "Embed map" tab
	4. Copy only URL and paste it within the src="" field below
*/}
        <div className="tm-container-inner-2 tm-map-section">
          <div className="row">
            <div className="col-12">
              <div className="tm-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11196.961132529668!2d-43.38581128725845!3d-23.011063013218724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdb695cd967b7%3A0x171cdd035a6a9d84!2sAv.%20L%C3%BAcio%20Costa%20-%20Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%20Brazil!5e0!3m2!1sen!2sth!4v1568649412152!5m2!1sen!2sth"
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      <ScriptTag type="text/javascript" src="js/jquery.min.js" />
      <ScriptTag type="text/javascript" src="js/parallax.min.js" />
      <ScriptTag type="text/javascript" src="js/main.js" />
    </Fragment>
  );
};

export default Contact;
