import React, { Fragment, useState } from "react";
import { NavLink,withRouter} from "react-router-dom";
import { ClearOutlined,PoweroffOutlined} from "@ant-design/icons";
import { Tooltip } from "antd";
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

  const handleClear = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("cartContent");
    setFresh(!fresh);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    props.history.push(props.location.pathname)
  };
  return (
    <Fragment>
      <div className="placeholder" style={{position:"relative"}}>
        <div className="filter-window border border-green">
        <div className="tm-header">
            <div className="row tm-header-inner">
              <div className="col-md-5 col-12">
                <img
                  src="img/simple-house-logo.png"
                  alt="Logo"
                  className="tm-site-logo"
                />
                <div className="tm-site-text-box">
                  <h1 className="tm-site-title">Sweets House</h1>
                  <h6 className="tm-site-description">
                    Quality,hygiene and services
                  </h6>
                </div>
              </div>
              <nav className="col-md-7 col-12 tm-nav">
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
                  {localStorage.token || sessionStorage.token ? (
                    <Fragment>
                      {localStorage.isAdmin || sessionStorage.isAdmin ? (
                        <li className="tm-nav-li">
                          <NavLink to="/dashboard/foods" className="tm-nav-link">
                            Dashboard
                          </NavLink>
                        </li>
                      ) : (
                        <Fragment>
                          <li className="tm-nav-li row">
                            <NavLink to="/cart" className="tm-nav-link">
                              Cart (
                              {JSON.parse(sessionStorage.getItem("cartContent"))
                                ? JSON.parse(
                                    sessionStorage.getItem("cartContent")
                                  ).length
                                : 0}
                              )
                            </NavLink>
                            <Tooltip title="Clear cart">
                              <a
                                href=""
                                className="text-danger ml-1 h6"
                                onClick={handleClear}
                              >
                                <ClearOutlined />
                              </a>
                            </Tooltip>
                          </li>
                          <li className="tm-nav-li">
                            <NavLink to="/myOrders" className="tm-nav-link">
                               Account
                            </NavLink>
                          </li>
                        </Fragment>
                      )}
                      <div
                        className="d-flex flex-column"
                        onMouseEnter={showLogout}
                        onMouseLeave={hideLogout}
                      >
                        <li className="tm-nav-li">
                          <a to="/#" className="tm-nav-link dropdown-toggle">
                            {localStorage.getItem("name")
                              ? localStorage.getItem("name")
                              : sessionStorage.getItem("name")}
                          </a>
                        </li>
                        <a
                          id="logout"
                          className="invisible text-center mt-2 text-white bg-danger rounded"
                          onClick={logout}
                        >
                          <div> <PoweroffOutlined/> <span style={{verticalAlign:"sub"}}>Logout</span></div>
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
                      <li className="tm-nav-li">
                        <NavLink to="/admin" className="tm-nav-link">
                          Admin ?
                        </NavLink>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="parallax-window">
          
        </div>
      </div>
      <ScriptTag type="text/javascript" src="js/jquery.min.js" />
      <ScriptTag type="text/javascript" src="js/parallax.min.js" />
      <ScriptTag type="text/javascript" src="js/main.js" />
    </Fragment>
  );
};

export default withRouter(Header_main);
