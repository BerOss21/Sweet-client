import React, { Fragment } from "react";
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

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginCustomer from "./components/LoginCustomer";
import RegisterCustomer from "./components/RegisterCutomer";

function App() {
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
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
