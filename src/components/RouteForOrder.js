import React from "react";
import {Route,Redirect} from "react-router-dom";

const RouteForOrder=({component:Component,...rest})=>{
    return (sessionStorage.order)?(
        <Route {...rest} component={Component}/>
    ):(
        <Redirect to="/"/>
    );
}

export default RouteForOrder;