import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./dashboard/Sidebar";
import Orders from "./dashboard/Orders";
import Foods from "./dashboard/Foods";
import Categories from "./dashboard/Categories";
import Staff from "./dashboard/Staff";
import Customers from "./dashboard/Customers";
import DashHome from "./dashboard/DashHome";

const Dashboard = (props) => {
  return (
    <Fragment>
      <div className="row">
      <BrowserRouter>            
          <Sidebar />
          <Switch>
            <Route exact path="/dashboard" component={DashHome} />
            <Route path="/dashboard/orders" component={Orders} />
            <Route path="/dashboard/foods" component={Foods} />
            <Route path="/dashboard/categories" component={Categories} />
            <Route path="/dashboard/customers" component={Customers} />
            <Route path="/dashboard/staff" component={Staff} />
          </Switch>
      </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default Dashboard;
