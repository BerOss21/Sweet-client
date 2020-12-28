import React, { Fragment,useEffect, useState,useCallback } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import RouteWithoutToken from "./components/RouteWithoutToken";
import ShowFood from "./components/ShowFood";
import OrderFood from "./components/OrderFood";
import Cart from "./components/Cart";
import Thanks from "./components/Thanks";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { message } from "antd";






function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Header/> 
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail/:food" component={ShowFood}/>
          <Route path="/order/:total" component={OrderFood}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/thanks" component={Thanks}/>
          <RouteWithoutToken path="/login" component={Login}/>
          <RouteWithoutToken path="/register" component={Register}/>
        </Switch>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
