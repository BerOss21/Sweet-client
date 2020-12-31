import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import admin from "./../img/l1.jpg";

const Sidebar = (props) => {
  return (
    <Fragment>
      <div
        className="list-group col-md-3 text-center border border-top-0 p-0"
        style={{ height: "100vh" }}
      >
        <div className="list-group-item list-group-item-action py-4 sidebar-head">
          Our House
        </div>
        <div className="list-group-item list-group-item-action py-4 sidebar-admin">
           <img src={admin} width="35%"/>
           <h4>Admin Name</h4>
        </div>
        <NavLink
          to="/dashboard/foods"
          className="list-group-item list-group-item-action border-none"
          
        >
          Foods
        </NavLink>
        <NavLink
          to="/dashboard/categories"
          className="list-group-item list-group-item-action border-none"
        >
          Categories
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className="list-group-item list-group-item-action border-none"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/staff"
          className="list-group-item list-group-item-action border-none"
        >
          Staff
        </NavLink>
        <NavLink
          to="/dashboard/customers"
          className="list-group-item list-group-item-action border-none"
        >
          Customers
        </NavLink>
      </div>
    </Fragment>
  );
};

export default Sidebar;
