import React, { Fragment } from "react";
import Footer from "./Footer";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const onFinish = (values) => {
     axios.post("/api/login",{
        email:values.email,
        password:values.password
    }).then(res=>{
        if(res.data.success){
            if(values.remember){
                localStorage.setItem("token",res.data.success.token);
                localStorage.setItem("name",res.data.success.name);
                localStorage.setItem("image",res.data.success.image);
                localStorage.setItem("isAdmin","admin");
            }
            else{
                sessionStorage.setItem("token",res.data.success.token);
                sessionStorage.setItem("name",res.data.success.name);
                sessionStorage.setItem("image",res.data.success.image);
                sessionStorage.setItem("isAdmin","admin");
            }
            props.history.push("/");
        }
        else if(res.data.error){
            message.error(res.data.error.map(item=>{return (<li>{item}</li>)}));
        }
        
    }).catch(error=>{
        if(error.response){
            console.log("error",error.response)
            message.error(Object.values(error.response.data).map(item=>{return (<li>{item}</li>)}));
        }
        console.log("values",values);
    })
    console.log("Received values of form: ", values);
  };

  return (
    <Fragment>
      <div className="container my-5 col-md-3 border border-secondary p-4">
        <h3 className="text-center">Admin form</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/password">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
