import React, { Fragment, useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  ClearOutlined,
  PoweroffOutlined,
  BellOutlined,
  BellFilled,
  EyeOutlined,
  DeleteOutlined
} from "@ant-design/icons";

import { Menu, Tooltip, Dropdown,Spin} from "antd";
import "./css/all.min.css";
import "./css/templatemo-style.css";
import "bootstrap/dist/css/bootstrap.css";
import ScriptTag from "react-script-tag";
import Logo from "./img/simple-house-logo.png";
import $ from "jquery";
import axios from "axios";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

const token = localStorage.token ? localStorage.token : sessionStorage.token;
const id = localStorage.id ? localStorage.id : sessionStorage.id;
const options = {
  broadcaster: "pusher",
  key: "mindsKey",
  cluster: "mt1",
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,
  wssHost: window.location.hostname,
  wssPort: 6001,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  //authEndpoint is your apiUrl + /broadcasting/auth
  // authEndpoint: config.pusher.authEndpoint,
  // As I'm using passport, I need to manually set up the headers.
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  },
};

const Header_main = (props) => {
  const [fresh, setFresh] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState([]);
  const [spinning, setSpinning] = useState(true);
 
  const menu = notifications.length ? (
    notifications.map((item) => {
      return (
        <Menu.Item className="mb-1" key={item.id}>
          <a href="#" onClick={(e)=>{e.preventDefault();notifClick(item.id,true)}} className={item.read_at? "":"bg-warning pb-1"}>    
              <div>            
                  <img className="rounded mr-2" src={item.data.customer_image.encoded} alt="customer_image" width="10%" height="20px"/>   
                  {item.data.message} 
                  <Tooltip title="Delete"> 
                    <a href="" className="ml-2 float-right text-danger" onClick={(e)=>{e.preventDefault();e.stopPropagation();notifDelete(item.id)}}>
                      <DeleteOutlined />
                    </a>       
                  </Tooltip> 
                  {
                    !item.read_at && (  
                      <Tooltip title="Mark as read">
                      <a href="" className="ml-2 float-right" onClick={(e)=>{e.preventDefault();e.stopPropagation();notifClick(item.id,false)}}>
                        <EyeOutlined />  
                      </a>  
                    </Tooltip>  
                    )
                  }     
              </div> 
              <span className="float-right">
                {item.created_at}
              </span>
              <div style={{clear:"both"}}>

              </div>

          </a>
        </Menu.Item>
      );
    })
  ) : (
    <Spin tip="Loading..." spinning={spinning}>
      <Menu.Item>
        <a href="">no notifications</a>
      </Menu.Item>
    </Spin>
  );

  const notifClick=(id,push)=>{
    axios.get(`/api/markAsRead/${id}`,{ headers: { "Authorization": `Bearer ${token}` } }).then(res=>{
      if(push){
        props.history.push("/dashboard/orders");
      }    
      else{
        setNotifications(res.data.notifications);
        setUnread(res.data.unread);
      }
    }).catch(err=>{
      console.log("error",err);
    })
  }

  const notifDelete=(id)=>{
    axios.get(`/api/deleteNotif/${id}`,{ headers: { "Authorization": `Bearer ${token}` } }).then(res=>{
        setNotifications(res.data.notifications);
    }).catch(err=>{
      console.log("error",err);
    })
  }

  const echo = new Echo(options);

  useEffect(() => {
    axios.get("/api/getNotifications",{ headers: { "Authorization": `Bearer ${token}` } }).then(res=>{
      console.log("notifs",res.data);
      setSpinning(false);
      setNotifications(res.data.notifications);
      setUnread(res.data.unread);
    }).catch(err=>{
      console.log("error",err);
    })

  },[fresh]);

  useEffect(()=>{  
    echo.private("isAdmin").notification((data) => {
        setFresh(!fresh);
    });
  },[])

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
    props.history.push(props.location.pathname);
  };
  return (
    <Fragment>
      <div className="placeholder" style={{ position: "relative" }}>
        <div className="filter-window border border-green">
          <div className="tm-header">
            <div className="row tm-header-inner">
              <div className="col-md-5 col-12">
                <img src={Logo} alt="Logo" className="tm-site-logo" />
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
                          <NavLink
                            to="/dashboard/sweets"
                            className="tm-nav-link"
                          >
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
                          <div>
                            {" "}
                            <PoweroffOutlined />{" "}
                            <span style={{ verticalAlign: "sub" }}>Logout</span>
                          </div>
                        </a>
                      </div>

                      {(sessionStorage.isAdmin || localStorage.isAdmin) && (
                        <li className="tm-nav-li">
                          <Dropdown
                            overlay={<Menu>{menu}</Menu>}
                            overlayClassName="container col-md-4"
                            overlayStyle={{maxHeight:"240px",overflow:"scroll"}}
                            placement="bottomLeft"
                            trigger={['click']}
                          >
                            <a className="text-white">
                              {unread.length ? (
                                <Fragment>
                                  <BellFilled
                                    style={{ fontSize: "18px", color: "red" }}
                                  />
                                  <span className="text-danger">
                                    {" "}
                                    ({unread.length})
                                  </span>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <BellOutlined style={{ fontSize: "18px" }} />
                                  <span>{spinning?(<Spin spinning={spinning}/>):(unread.length)}</span>
                                </Fragment>
                              )}
                            </a>
                          </Dropdown>
                        </li>
                      )}
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
        <div className="parallax-window"></div>
      </div>
      <ScriptTag type="text/javascript" src="js/jquery.min.js" />
      <ScriptTag type="text/javascript" src="js/parallax.min.js" />
      <ScriptTag type="text/javascript" src="js/main.js" />
    </Fragment>
  );
};

export default withRouter(Header_main);
