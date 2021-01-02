import React, { Fragment, useEffect ,useState} from "react";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";



const HeadBar = (props) => {   
  return (
    <Fragment>
        <a href="/" className="headbar-link">
            <div className="text-center col-12 p-3 h5">
            <ArrowLeftOutlined />  <span style={{verticalAlign:"bottom"}}>Home Page</span>
            </div>
        </a>
    </Fragment>
  );
};

export default HeadBar;