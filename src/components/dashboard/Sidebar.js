import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import admin from "./../img/l1.jpg";

const Sidebar = (props) => {
  return (
    <Fragment>
      <div
        className="list-group col-md-3 text-center border border-top-0 p-0 bg-transparent side"
      >
        <div className="list-group-item list-group-item-action py-4 sidebar-head bg-transparent">
          Our House
        </div>
        <div className="list-group-item list-group-item-action py-4 sidebar-admin  bg-transparent">
           <img src={admin} width="35%"/>
           <h4>Admin Name</h4>
        </div>
        <NavLink
          to="/dashboard/foods"
          className="list-group-item list-group-item-action border-none bg-transparent"
          
        >
          Foods
        </NavLink>
        <NavLink
          to="/dashboard/categories"
          className="list-group-item list-group-item-action border-none bg-transparent"
        >
          Categories
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className="list-group-item list-group-item-action border-none bg-transparent"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/staff"
          className="list-group-item list-group-item-action border-none bg-transparent"
        >
          Staff
        </NavLink>
        <NavLink
          to="/dashboard/customers"
          className="list-group-item list-group-item-action border-none bg-transparent"
        >
          Customers
        </NavLink>
      </div>
    </Fragment>
  );
};

export default Sidebar;
