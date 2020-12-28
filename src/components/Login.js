import React, { Fragment } from "react";
import Footer from "./Footer";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
            }
            else{
                sessionStorage.setItem("token",res.data.success.token);
                sessionStorage.setItem("name",res.data.success.name);
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
    })
    console.log("Received values of form: ", values);
  };

  return (
    <Fragment>
      <div className="container my-5 col-md-3 border border-secondary p-4">
        <h3 className="text-center">Login form</h3>
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

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
