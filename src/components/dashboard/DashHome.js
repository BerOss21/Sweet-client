import React, { Fragment, useEffect ,useState} from "react";
import axios from "axios";
import HeadBar from "./HeadBar";


const DashHome = (props) => {   
  return (
    <Fragment>
        <div className="col-md-9 px-0">
            <HeadBar/>
          DashHome page
        </div>
    </Fragment>
  );
};

export default DashHome;