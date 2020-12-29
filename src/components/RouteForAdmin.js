import React from "react";
import { Redirect, Route } from "react-router-dom";


const RouteForAdmin=({component:Component,...rest })=>{
    return((sessionStorage.isAdmin || localStorage.isAdmin))?(
        <Route {...rest} component={Component} />
    ):(
        <Redirect to="/"/>
    );
}

export default RouteForAdmin;