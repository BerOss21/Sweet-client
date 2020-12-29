import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { message, Table } from "antd";

const MyOrders = (props) => {
  const [orders, setOrders] = useState("");
  ////////////////////////////// get token

  const getToken = () => {
    return localStorage.token
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
  };

  const id = () => {
    return localStorage.id
      ? localStorage.getItem("id")
      : sessionStorage.getItem("id");
  };

  /////////////////////////////

  useEffect(() => {
    axios
      .get(`/api/myOrders/${id()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        console.log("myOrders", res.data.orders);
        setOrders(res.data.orders);
      });
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Detail",
      dataIndex: "detail",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
  ];
  const data = orders
    ? orders.map((item) => {
        return {
          key: item.id,
          date: item.created_at,
          state: item.state,
          detail: item.detail
            ? item.detail.map((i) => (
                <li>
                  {i.qty} kg of {i.name}
                </li>
              ))
            : "",
            total:item.total+ " DHS"
        };
      })
    : "";

  return (
    <Fragment>
      <div className="container mt-5">
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </Fragment>
  );
};

export default MyOrders;
