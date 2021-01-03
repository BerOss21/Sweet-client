import React, { Fragment, useEffect, useState, useRef } from "react";
import "antd/dist/antd.css";
import HeadBar from "./HeadBar";
import { Link } from "react-router-dom";
import { Table, Modal, Select, message,Spin} from "antd";
import axios from "axios";

const { Option } = Select;

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const [fresh, setFresh] = useState(false);
  const [itemToEdit, setItemToEdit] = useState("");
  const form = useRef();
  const isInitialMount = useRef(true);

  ////////////////////////////// get token

  const getToken = () => {
    return localStorage.token
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
  };

  /////////////////////////////

  useEffect(() => {
    let token=getToken();
    axios
      .get("/api/orders",{ headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        console.log("orders", res.data.orders);
        setOrders(res.data.orders);
        setSpinning(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error", error.response);
        }
      });
  }, [fresh]);

  const handleStateChange=(id, value)=>{
    let token=getToken();
    axios
      .patch(`/api/orders/${id}`, { state: value },{ headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        if (res.data.success) {
          message.success("State updated");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  const handleFilterChange=value=>{
    let token=getToken();
    axios.get(`/api/orders/getByState/${value}`,{ headers: { "Authorization": `Bearer ${token}` } }).then(res=>{
      setOrders(res.data.orders);
    }).catch(err=>{
      console.log("error",err)
    })
  }
  const optionList = [
    <Option value="to do">To do</Option>,
    <Option value="ongoing">Ongoing</Option>,
    <Option value="done">Done</Option>,
  ];

  const optionListForFilter= [
    <Option value="all">All Orders</Option>,
    <Option value="to do">To do</Option>,
    <Option value="ongoing">Ongoing</Option>,
    <Option value="done">Done</Option>,
  ];

  const columns = [
    {
      title: "",
      dataIndex: "state",
      width: 150,
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Detail",
      dataIndex: "show",
      fixed: "right",
      width: 100,
    },
  ];

  const data = orders
    ? orders.map((item) => {
        return {
          key: item.id,
          state: (
            <Select
              defaultValue={item.state}
              style={{ width: 120 }}
              onChange={(value) => {
                handleStateChange(item.id, value);
              }}
            >
              {optionList}
            </Select>
          ),
          fullname: item.name,
          phone: item.phone,
          address: item.address,
          message: item.message,
          date: item.created_at,
          show: (
            <button
              className="btn btn-primary"
              onClick={() => {
                showModal(item.id);
              }}
            >
              Show
            </button>
          ),
        };
      })
    : "";

  const columnsList = [
    {
      title: "",
      dataIndex: "image",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 150,
    },
  ];

  const dataList = order.detail
    ? order.detail.map((item) => {
        return {
          key: item.id,
          image: <img src={item.image} width="60%" />,
          name: item.name,
          quantity: item.qty + " Kg",
          price: item.qty * item.price + " DHS",
        };
      })
    : "";

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  /* Modal of add data */
  const showModal = (id) => {
    let order = orders.filter((item) => {
      return item.id == id;
    });
    setOrder(order[0]);
    console.log("order", order);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /* end of modal*/

  return (
    <Fragment>
      <div className="col-md-9 px-0">
        <HeadBar />
        <div className="p-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{backgroundColor:"rgba(255,99,71,0.6)"}}>
              <li className="breadcrumb-item">
                <Link to="/dashboard" className="text-dark">Dashboard</Link>
              </li>
              <li className="breadcrumb-item text-dark active" aria-current="page">
                Orders
              </li>
            </ol>
          </nav>
          <div className="content my-5">
            <h3 className="mb-4">Orders table</h3>
            <Modal
              title="Detail"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              destroyOnClose={true}
              okButtonProps={{className:"d-none"}}
            >
              <Table
                columns={columnsList}
                dataSource={dataList}
                pagination={false}
              />
              <div className="alert alert-success text-center w-100">
                Total to pay: {order.total} DHS
              </div>
            </Modal>
            <Select
              defaultValue="All Orders"
              style={{ width: 150,marginBottom:"8px"}}
              onChange={handleFilterChange}
            >
              {optionListForFilter}
            </Select>
            <Spin tip="Loading..." spinning={spinning}> 
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: 1300, y: 300 }}
            />
            </Spin>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
