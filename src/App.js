import React, { Fragment, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
//import Register from "./components/Register";
import Login from "./components/Login";
import RouteWithoutToken from "./components/RouteWithoutToken";
import RouteWithToken from "./components/RouteWithToken";
import RouteForAdmin from "./components/RouteForAdmin";
import RouteForOrder from "./components/RouteForOrder";
import ShowFood from "./components/ShowFood";
import OrderFood from "./components/OrderFood";
import MyOrders from "./components/MyOrders";
import Cart from "./components/Cart";
import Thanks from "./components/Thanks";
import LoginCustomer from "./components/LoginCustomer";
import RegisterCustomer from "./components/RegisterCutomer";
import ForgotPass from './components/reset_password/ForgotPass';
import ResetPass from './components/reset_password/ResetPass';
import ForgotPassCustomer from './components/reset_password/ForgotPassCustomer';
import ResetPassCustomer from './components/reset_password/ResetPassCustomer';
import {notification } from 'antd';

import { BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css";

import Echo from 'laravel-echo';
import Pusher from "pusher-js";

const token=localStorage.token?localStorage.token:sessionStorage.token;
const id=localStorage.id?localStorage.id:sessionStorage.id;
const options = {
  broadcaster: 'pusher',
  key: "mindsKey",
  cluster: "mt1",
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,
  wssHost: window.location.hostname,
  wssPort: 6001,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  //authEndpoint is your apiUrl + /broadcasting/auth
  // authEndpoint: config.pusher.authEndpoint, 
  // As I'm using passport, I need to manually set up the headers.
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  },
};

function App(props) {
  const echo = new Echo(options);

  const openNotification = (msg) => {
    notification.open({
      message: 'Notification',
      description:msg,
      placement:"bottomRight",
      onClick: () => {
       console.log("clicked")
      },
    });
  };

  useEffect(()=>{
    echo.private("isAdmin").notification((data) => {
      if(localStorage.isAdmin || sessionStorage.isAdmin){
        openNotification(data.message);
      }  
    });
  },[]);

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:food" component={ShowFood} />
          <RouteForOrder path="/order" component={OrderFood} />
          <RouteWithToken path="/myOrders" component={MyOrders} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <RouteForAdmin path="/dashboard" component={Dashboard} />
          <RouteWithToken path="/cart" component={Cart} />
          <Route path="/thanks" component={Thanks} />
          <RouteWithoutToken path="/login" component={LoginCustomer} />
          <RouteWithoutToken path="/register" component={RegisterCustomer} />
          <RouteWithoutToken path="/admin" component={Login} />
          <RouteWithoutToken path="/password" component={ForgotPass}/>
          <RouteWithoutToken path="/resetpass/:token" component={ResetPass}/>
          <RouteWithoutToken path="/customer/password" component={ForgotPassCustomer}/>
          <RouteWithoutToken path="/resetpass_customer/:token" component={ResetPassCustomer}/>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
