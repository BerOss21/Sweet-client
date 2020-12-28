import React from "react";
import {Route,Redirect} from "react-router-dom";

const RouteWithToken=({component:Component,...rest})=>{
    return (localStorage.token)?(
        <Route {...rest} component={Component}/>
    ):(
        <Redirect to="/"/>
    );
}

export default RouteWithToken;