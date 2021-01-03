import React, { Fragment, useEffect, useState} from "react";
import "antd/dist/antd.css";
import HeadBar from "./HeadBar";
import { Link } from "react-router-dom";
import { Table, Modal, message,Popconfirm,Spin} from "antd";
import axios from "axios";

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [loading, setLoading] = useState(true);

  ////////////////////////////// get token

  const getToken = () => {
    return localStorage.token
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
  };

  /////////////////////////////

  useEffect(() => {
    axios
      .get("/api/customers")
      .then((res) => {
        console.log("customers", res.data);
        setCustomers(res.data.customers);
        setLoading(false)
      })
      .catch((error) => {
        if (error.response) {
          console.log("error", error.response);
        }
      });
  }, [fresh]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Number of orders",
      dataIndex: "number",
    },
    {
      title: "Orders",
      dataIndex: "orders",
    },

    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 150,
    },
  ];

  const data = customers
    ? customers.map((item) => {
        return {
          key: item.id,
          image:
            item.image ? (
                <img src={item.image.encoded} width="100" alt="customer" />
            ) : (
              ""
            ),
          full_name: item.name,
          email: item.email,
          number: item.orders.length,
          orders: (
            <button
              className="btn btn-primary mr-md-1"
              onClick={() => {
                showModal(item.id);
              }}
            >
              show
            </button>
          ),
          action: (
            <Popconfirm
            title="Are you sure to delete this customer?"
            onConfirm={()=>{deleteItem(item.id)}}
            onCancel={console.log("cancel")}
            okText="Yes"
            cancelText="No"
          >
             <button className="btn btn-danger mr-md-1">Delete</button>
          </Popconfirm>  
          )
        };
      })
    : "";

  const columnsOrders = [
    {
      title: "Date",
      dataIndex: "date",
      width:12,
    },
    {
      title: "State",
      dataIndex: "status",
      width:6,
      key: 'status',
      filters: [
        { text: 'To do', value: 'To do' },
        { text: 'Done', value: 'Done' },
        { text: 'Ongoing', value: 'Ongoing' }
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Detail",
      dataIndex: "detail",
      width:11
    },
    {
      title: "Total",
      dataIndex: "total",
      width:11
    },
  ];
  const dataOrders = orders
    ? orders.map((item) => {
        return {
          key: item.id,
          date: item.created_at,
          status: item.state,
          detail: item.detail
            ? item.detail.map((i) => (
                <li>
                  {i.qty} kg of {i.name}
                </li>
              ))
            : "",
          total: <strong className="text-danger">{item.total} DHS</strong>,
        };
      })
    : "";

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  /* Delete */
  const deleteItem = (id) => {
    let token = getToken();
    axios
      .delete(`/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          message.success("The customer was deleted");
          setFresh(!fresh);
        } else{
          message.error("The customer was not deleted");
        }
      }).catch(err=>{
          console.log("error",err)
      });
  };
  /* end delete */

  /* Modal of add data */
  const showModal = (id) => {
    var customer = customers.filter((item) => item.id == id);
    if (customer) {
      setOrders(customer[0].orders);
      setIsModalVisible(true);
    }
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
                Customers
              </li>
            </ol>
          </nav>
          <div className="content my-5">
            <h3 className="mb-4">Customers table</h3>
            <Modal
              title={"Orders List"}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              destroyOnClose={true}
              okButtonProps={{className:"d-none"}}
            >           
              <Table
                columns={columnsOrders}
                dataSource={dataOrders}
                onChange={onChange}
                bordered
                pagination={{ pageSize: 5 }}
                scroll={{ x: 800, y: 300 }}
              />
            </Modal>  
            <Spin tip="Loading..." spinning={loading}>       
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: 1000, y: 300 }}
            />
            </Spin>  
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Customers;
