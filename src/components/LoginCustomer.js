import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";
import axios from "axios";

const LoginCustomer = (props) => {
  const [loading,setLoading]=useState(false);
  const onFinish = (values) => {
    setLoading(true);
    axios.post("/api/login/customers",{
        email:values.email,
        password:values.password
    }).then(res=>{
        if(res.data.success){
            if(values.remember){
                localStorage.setItem("token",res.data.success.token);
                localStorage.setItem("name",res.data.success.name);
                localStorage.setItem("id",res.data.success.id);
                localStorage.setItem("image",res.data.success.image.encoded);
                localStorage.setItem("email",res.data.success.email);
            }
            else{
                sessionStorage.setItem("token",res.data.success.token);
                sessionStorage.setItem("name",res.data.success.name);
                sessionStorage.setItem("id",res.data.success.id);
                sessionStorage.setItem("image",res.data.success.image.encoded);
                sessionStorage.setItem("email",res.data.success.email);
            }
            props.history.push("/");
        }
        else if(res.data.error){
          setLoading(false);
            message.error(res.data.error.map(item=>{return (<li>{item}</li>)}));
        }
        
    }).catch(error=>{
        if(error.response){
           setLoading(false);
            console.log("error",error.response)
            message.error(Object.values(error.response.data).map(item=>{return (<li>{item}</li>)}));
        }
    })
  };

  return (
    <Fragment>
      <div className="container my-5 col-md-3 border border-secondary p-4 bg-transparent">
        <h3 className="text-center mb-5">Login form</h3>
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

            <Link to="/customer/password">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="login-form-button text-white"
              style={{backgroundColor:"rgb(103,82,50)"}}
              loading={loading}
            >
              Log in
            </Button>
            Or <Link to="/register">
             Register now
            </Link>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoginCustomer;