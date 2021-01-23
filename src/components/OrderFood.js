import React, { Fragment, useEffect, useState } from "react";
import { Card, Form, Input, Button, Alert, message} from "antd";
import axios from "axios";
import Footer from "./Footer";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const OrderFood = (props) => {
  const [total,setTotal]=useState("");
  const [loading,setLoading]=useState(false);

  
  ////////////////////////////// get token

  const getToken=()=>{
    return (localStorage.token)?localStorage.getItem("token"):sessionStorage.getItem("token");
  }

  /////////////////////////////
  
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    if(JSON.parse(sessionStorage.getItem("order")).length>0){
      axios.post("/api/orders",{
        name:values.fullname,
        phone:values.phone,
        address:values.address,
        message:values.message,
        customer_id:sessionStorage.id || localStorage.id,
        total:sessionStorage.total,
        detail:JSON.parse(sessionStorage.getItem("order"))     
      },{ headers: { "Authorization": `Bearer ${getToken()}` } }).then(res=>{
        if(res.data.success){
            sessionStorage.removeItem("order");
            sessionStorage.removeItem("cartContent");
            props.history.push("/thanks");
            setLoading(false);
        }
      }).catch(err=>{
        console.log("error",err);
        setLoading(false);
      })
    }

    else{
      message.warning("you should add something to cart!!")
    }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=>{
      setTotal(props.match.params.total);
      console.log("props",content)
  });

  const content=JSON.parse(sessionStorage.getItem("order"))?(
    JSON.parse(sessionStorage.getItem("order")).map(item=>{
      return(
      <p key={item.id}>{item.qty} Kg Of {item.name}</p>
      )
    })
  ):"";
  return (
    <Fragment>
      <div className="container mt-5 col-md-6 p-1">
        <Card title="Checkout">
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{fullname:localStorage.name}}
          >
            <Form.Item
              label="Fullname"
              name="fullname"
              rules={[
                { required: true, message: "Please input your fullname!" },
              ]}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Message" name="message">
              <Input.TextArea />
            </Form.Item>
             <Form.Item wrapperCol={{ offset: 6 }}>
             <Alert 
            message={content}
            type="info" 
            style={{textAlign:"center",width:"90%"}}
            />
             <Alert 
            message={`${sessionStorage.total} DHS`}
            type="success" 
            style={{textAlign:"center",width:"90%",marginTop:"5px"}}
            />
              <Button type="primary" htmlType="submit"  loading={loading} style={{width:"90%",marginTop:"5px"}}>
                Order
              </Button>
            </Form.Item>    
          </Form>
        </Card>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default OrderFood;
