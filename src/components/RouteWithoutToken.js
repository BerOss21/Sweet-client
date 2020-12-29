import React from "react";
import {Route,Redirect} from "react-router-dom";

const RouteWithoutToken=({component:Component,...rest})=>{
    return (!(localStorage.token || sessionStorage.token))?(
        <Route {...rest} component={Component}/>
    ):(
        <Redirect to="/"/>
    );
}

export default RouteWithoutToken;