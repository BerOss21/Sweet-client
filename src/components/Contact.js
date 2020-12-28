import React, { Fragment, useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import "./css/all.min.css";
import "./css/templatemo-style.css";
import ScriptTag from "react-script-tag";

const Contact = (props) => {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  const [subject,setSubject]=useState("");
  const [success,setSuccess]=useState("");

  const handleSubmit=e=>{
      e.preventDefault();
      axios.post("/api/send",{
        name,
        email,
        message,
        subject  
      }).then(res=>{
          console.log("response contact",res);
          setSuccess(res.data.success);     
          setMessage("");
          setName("");
          setSubject("");
          setEmail("");
         
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

  const handleMessage=e=>{
    e.preventDefault();
    setMessage(e.target.value);
  }

  return (
    <Fragment>
      <div>
        <header className="row tm-welcome-section mx-auto">
          <h2 className="col-12 text-center tm-section-title">Contact Page</h2>
          <p className="col-12 text-center">
            You may use{" "}
            <a
              rel="nofollow"
              href="https://www.ltcclock.com/downloads/simple-contact-form/"
              target="_blank"
            >
              Simple Contact Form
            </a>{" "}
            to send email to your inbox. You can modify and use this template
            for your website. Header image has a parallax effect. Total 3 HTML
            pages included in this template.
          </p>
        </header>
        <div className="tm-container-inner-2 tm-contact-section">
          <div className="row">
            <div className="col-md-6">
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
                    name="message"
                    className="form-control"
                    placeholder="Message"
                    required
                    onChange={handleMessage}
                    value={message}
                  />
                </div>
                <div className="form-group tm-d-flex">
                  <button
                    type="submit"
                    className="tm-btn tm-btn-success tm-btn-right"
                  >
                    Send
                  </button>
                </div>
              </form>
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
        <div className="tm-container-inner-2 tm-info-section">
          <div className="row">
            {/* FAQ */}
            <div className="col-12 tm-faq">
              <h2 className="text-center tm-section-title">FAQs</h2>
              <p className="text-center">
                This section comes with Accordion tabs for different questions
                and answers about Simple House HTML CSS template. Thank you.
                #666
              </p>
              <div className="tm-accordion">
                <button className="accordion">
                  1. Fusce eu lorem et dui #09C maximus varius?
                </button>
                <div className="panel">
                  <p>
                    #666 Duis blandit purus vel nenenatis rutrum. Pellentesque
                    pellentesque tindicunt lorem, ac egestas massa sollicitudin
                    vel. Nam scelerisque vulputate quam mollis pretium. Morbi
                    condimentum volutpat.
                  </p>
                </div>
                <button className="accordion">
                  2. Vestibulum #999 ante ipsum primis in faucibus orci?
                </button>
                <div className="panel">
                  <p>
                    Mauris euismod odio at commodo rhoncus. Maecenas nec
                    interdum purus, sed auctor est. Sed eleifend urna nec diam
                    consectetur, a aliquet turpis facilisis. Integer est sapien,
                    sagittis vel massa vel, interdum euismod erat. Aenean
                    sollicitudin nisi neque, efficitur posuere urna rutrum
                    porta.
                  </p>
                </div>
                <button className="accordion">
                  3. Can I redistribute this template as a ZIP file?
                </button>
                <div className="panel">
                  <p>
                    Redistributing this template as a downloadable ZIP file on
                    any template collection site is strictly prohibited. You
                    will need to{" "}
                    <a href="https://templatemo.com/contact">
                      contact TemplateMo
                    </a>{" "}
                    for additional permissions about our templates. Thank you.
                  </p>
                </div>
                <button className="accordion">
                  4. Ut ac erat sit amet neque efficitur faucibus et in lectus?
                </button>
                <div className="panel">
                  <p>
                    Vivamus viverra pretium ultricies. Praesent feugiat, sapien
                    vitae blandit efficitur, sem nulla venenatis nunc, vel
                    maximus ligula sem a sem. Pellentesque ligula ex, facilisis
                    ac libero a, blandit ullamcorper enim.
                  </p>
                </div>
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
