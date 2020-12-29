import React, { Fragment, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { Table, Select, message } from "antd";
import Footer from "./Footer";
import axios from "axios";

const { Option } = Select;

const Cart = (props) => {
  const [cartContent, setCartContent] = useState([]);
  const [shipping, setShipping] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [region, setRegion] = useState("");
  const [total, setTotal] = useState(0);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    axios
      .get("/api/shipping")
      .then((res) => {
        setShipping(res.data.prices);
        console.log("shipping", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    var cart = sessionStorage.cartContent
      ? JSON.parse(sessionStorage.getItem("cartContent"))
      : "";
    let sub = 0;
    if(cart.length){
        cart.forEach((item) => {
            sub += item.qty * item.price;
        });
    }
    setSubtotal(sub);
    setTotal(sub);
    setCartContent(cart);
    sessionStorage.setItem("order",JSON.stringify(cart));
  }, []);

  useEffect(() => {
    setTotal(subtotal + region);
  }, [subtotal, region]);

  // change qty

  const onChange = (key, value) => {
    let content = cartContent;
    content[key].qty = value;
    setCartContent(content);
    sessionStorage.setItem("order",JSON.stringify(content));
    let sub = 0;
    content.forEach((item) => {
      sub += item.qty * item.price;
    });
    setSubtotal(sub);
    setFresh(!fresh);
  };

  // Select Region
  const handleSelectChange = (value) => {
    setRegion(shipping[value].price);
  };

  const handleDelete = (id) => {
    var cart = cartContent.filter((item) => { //for current order
      return item.id != id;
    });
    var cart2 = JSON.parse(sessionStorage.getItem("cartContent")).filter((item) => { //for cart content
        return item.id != id;
    });
    let sub = 0;
    cart.forEach((item) => {
      sub += item.qty * item.price;
    });
    setCartContent(cart);
    setSubtotal(sub);
    sessionStorage.setItem("cartContent", JSON.stringify(cart2));
    sessionStorage.setItem("order", JSON.stringify(cart));
    props.history.push(props.location.pathname);
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      width: "100",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "60",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "60",
    },
    {
      title: "Quantity (Kg)",
      dataIndex: "quantity",
      width: "60",
    },
    {
      title: "Total",
      dataIndex: "total",
      fixed: "right",
      width: 150,
    },
    {
      title: "",
      dataIndex: "remove",
      fixed: "right",
      width: 150,
    },
  ];

  const data = cartContent
    ? cartContent.map((item, key) => {
        return {
          key: item.id,
          name: item.name,
          price: item.price + " DHS",
          image: <img src={item.image} width="40%" />,
          quantity: (
            <input
              type="number"
              min="1"
              max="10"
              defaultValue="1"
              onChange={(e) => {
                onChange(key, e.target.value);
              }}
            />
          ),
          total: <strong>{item.qty * item.price + " DHS"}</strong>,
          remove: (
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(item.id)}
            >
              remove
            </button>
          ),
        };
      })
    : "";

  const optionList = shipping
    ? shipping.map((item, key) => {
        return (
          <Option value={key} key={item.id}>
            {item.region} ({item.price} DHS)
          </Option>
        );
      })
    : "";
  const columnsList = [
    {
      title: "Total",
      dataIndex: "title",
      colSpan: 2,
    },
    {
      title: "Desc",
      colSpan: 0,
      dataIndex: "desc",
    },
  ];
  const dataList = [
    {
      key: 1,
      title: <strong>Subtotal: </strong>,
      desc: (
        <div>
          <strong>{subtotal} DHS</strong>
        </div>
      ),
    },
    {
      key: 2,
      title: <strong>Shipping:</strong>,
      desc: (
        <Select
          defaultValue={"Choise a region"}
          style={{ width: 200 }}
          onChange={handleSelectChange}
        >
          {optionList}
        </Select>
      ),
    },
    {
      key: 3,
      title: <strong>Total: </strong>,
      desc: (
        <div className="text-danger">
          <strong>{total} DHS</strong>
        </div>
      ),
    },
  ];

  const handleCheckout=()=>{
      if(region){
        props.history.push({pathname:`/order`,cartContent,total})
      }
      else{
          message.error("You should choise a region")
      }
      
  }
  return (
    <Fragment>
      <div className="container my-5">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 1300, y: 300 }}
        />
        <div className="col-md-4 float-md-right mt-3">
          <Table
            columns={columnsList}
            dataSource={dataList}
            pagination={false}
          />
          <button className="btn btn-secondary w-100" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
      <div style={{ clear: "both" }}>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Cart;
