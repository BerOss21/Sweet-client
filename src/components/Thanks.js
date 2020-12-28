import React, { Fragment } from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Thanks = (props) => {
  return (
    <Fragment>
      <Result
        status="success"
        title="You order was sent successfully,You will be contacted soon !"
        extra={[
          <Link to="/">
            <Button type="primary" key="console">
              Return to Home
            </Button>
          </Link>,
        ]}
      />
      <Footer />
    </Fragment>
  );
};

export default Thanks;
