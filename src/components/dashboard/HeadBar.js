import React, { Fragment, useEffect ,useState} from "react";
import axios from "axios";



const HeadBar = (props) => {   
  return (
    <Fragment>
        <a href="/" className="headbar-link">
            <div className="text-center col-12 head-div">
                Home Page
            </div>
        </a>
    </Fragment>
  );
};

export default HeadBar;