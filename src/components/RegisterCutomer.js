import React, { useState,Fragment } from "react";
import Footer from "./Footer";
import { Form, Input,Button, message } from "antd";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: { span: 28 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 18},
    sm: { span: 12},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterCustomer = (props) => {
  const [form] = Form.useForm();
  const [loading,setLoading]=useState(false)
  const onFinish = (values) => {
    setLoading(true);
    axios.post("/api/register/customers",{
      name:values.name,
      email:values.email,
      password:values.password,
      confirm:values.confirm
    }).then(res=>{
      localStorage.setItem("token",res.data.success.token);
      localStorage.setItem("name",res.data.success.name);
      localStorage.setItem("id",res.data.success.id);
      localStorage.setItem("image",res.data.success.image.encoded);
      localStorage.setItem("email",res.data.success.email);
      props.history.push("/");
      message.success("You are registred now");
    }).catch(err=>{
      if(err.response){
        setLoading(false);
        console.log("errors",err.response)
      }
    })
  };

  return (
    <Fragment>
      <div className="container my-5 col-md-4 border border-secondary p-4 text-center bg-transparent">
        <h3 className="text-center mb-5">Register form</h3>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
        <Button  
           htmlType="submit"
           className="text-white"
           loading={loading}
           style={{backgroundColor:"rgb(103,82,50)"}}>
          Register
        </Button> 
      </Form.Item>
        </Form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default RegisterCustomer;