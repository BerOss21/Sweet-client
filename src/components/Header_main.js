import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import {ClearOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import "./css/all.min.css";
import "./css/templatemo-style.css";
import "bootstrap/dist/css/bootstrap.css";
import ScriptTag from "react-script-tag";
import $ from "jquery";

const Header_main = (props) => {
  const [fresh, setFresh] = useState(false);
  const showLogout = () => {
    $("#logout").removeClass("invisible");
  };

  const hideLogout = () => {
    $("#logout").addClass("invisible");
  };

  const handleClear=e=>{
    e.preventDefault();
    sessionStorage.removeItem("cartContent");
    setFresh(!fresh);
  }
  
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");  
    setFresh(!fresh);
  };
  return (
    <Fragment>
      <div className="placeholder">
        <div className="parallax-window">
          <div className="tm-header">
            <div className="row tm-header-inner">
              <div className="col-md-6 col-12">
                <img
                  src="img/simple-house-logo.png"
                  alt="Logo"
                  className="tm-site-logo"
                />
                <div className="tm-site-text-box">
                  <h1 className="tm-site-title">Simple House</h1>
                  <h6 className="tm-site-description">
                    new restaurant template
                  </h6>
                </div>
              </div>
              <nav className="col-md-6 col-12 tm-nav">
                <ul className="tm-nav-ul">
                  <li className="tm-nav-li" id="homeLink">
                    <NavLink exact to="/" className="tm-nav-link">
                      Home
                    </NavLink>
                  </li>
                  <li className="tm-nav-li">
                    <NavLink to="/about" className="tm-nav-link">
                      About
                    </NavLink>
                  </li>
                  <li className="tm-nav-li">
                    <NavLink to="/contact" className="tm-nav-link">
                      Contact
                    </NavLink>
                  </li>
                  <li className="tm-nav-li row">
                    <NavLink to="/cart" className="tm-nav-link">
                      Cart ({JSON.parse(sessionStorage.getItem("cartContent"))?JSON.parse(sessionStorage.getItem("cartContent")).length:0})
                    </NavLink>
                    <Tooltip title="Clear cart">
                      <a href="" className="text-danger ml-1 h6" onClick={handleClear} ><ClearOutlined /></a>
                    </Tooltip>
                  </li>
                  {(localStorage.token || sessionStorage.token)? (
                    <Fragment>
                      <li className="tm-nav-li">
                        <NavLink to="/dashboard" className="tm-nav-link">
                          Dashboard
                        </NavLink>
                      </li>
                      <div
                        className="d-flex flex-column"
                        onMouseEnter={showLogout}
                        onMouseLeave={hideLogout}
                      >
                        <li className="tm-nav-li">
                          <a to="/#" className="tm-nav-link dropdown-toggle">
                            {localStorage.getItem("name")?localStorage.getItem("name"):sessionStorage.getItem("name")}
                          </a>
                        </li>
                        <a
                          id="logout"
                          className="invisible text-center mt-2 text-white bg-primary rounded"
                          onClick={logout}
                        >
                          <div>Logout</div>
                        </a>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <li className="tm-nav-li">
                        <NavLink to="/login" className="tm-nav-link">
                          Login
                        </NavLink>
                      </li>
                      <li className="tm-nav-li">
                        <NavLink to="/register" className="tm-nav-link">
                          Register
                        </NavLink>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <ScriptTag type="text/javascript" src="js/jquery.min.js" />
      <ScriptTag type="text/javascript" src="js/parallax.min.js" />
      <ScriptTag type="text/javascript" src="js/main.js" />
    </Fragment>
  );
};

export default Header_main;
