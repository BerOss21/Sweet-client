import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Header_main from "./Header_main";

const Header = (props) => {
  console.log("path", props.location.pathname);
  return props.location.pathname == "/dashboard" ||
    props.location.pathname == "/dashboard/foods" ||
    props.location.pathname == "/dashboard/categories" ||
    props.location.pathname == "/dashboard/orders" ||
    props.location.pathname == "/dashboard/staff"? (
    ""
  ) : (
    <Header_main />
  );
};

export default withRouter(Header);
