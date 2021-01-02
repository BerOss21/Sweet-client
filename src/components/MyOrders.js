import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./main.css";
import {
  Table,
  Select,
  Statistic,
  Card,
  Image,
  Avatar,
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message
} from "antd";
import {
  MailOutlined,
  CopyOutlined,
  UserOutlined,
  PlusOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import Footer from "./Footer";

const { Option } = Select;

/*Form */

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

/* end form*/

const MyOrders = (props) => {
  const [orders, setOrders] = useState("");
  const [allOrders, setAllOrders] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  ////////////////////////////// get token

  const getToken = () => {
    return localStorage.token
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
  };

  const getId = () => {
    return localStorage.id
      ? localStorage.getItem("id")
      : sessionStorage.getItem("id");
  };

  const getImage = () => {
    return localStorage.image
      ? localStorage.getItem("image")
      : sessionStorage.getItem("image");
  };

  /////////////////////////////

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    let id = getId();
    let token = getToken();

    axios
      .get(`/api/myOrders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data.orders);
        setAllOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          state: <strong>{item.state}</strong>,
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

  const handleFilterChange = (value) => {
    if (value == "all") {
      let all = allOrders;
      setOrders(all);
    } else {
      let ordersFiltered = allOrders.filter((item) => {
        return item.state.toLowerCase() == value;
      });
      setOrders(ordersFiltered);
    }
  };

  const optionListForFilter = [
    <Option value="all">All Orders</Option>,
    <Option value="to do">To do</Option>,
    <Option value="ongoing">Ongoing</Option>,
    <Option value="done">Done</Option>,
  ];

  // Form
  const onFinish = (values) => {
    axios
      .patch(
        `/api/customers/${getId()}`,
        {
          name: values.name,
          email: values.email,
          image: imageUrl,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((res) => {
        if (res.data.success) {
          console.log("my datta",res.data.success)
          message.success("Profile updated");
          if(localStorage.token){
            localStorage.setItem("name",res.data.success.name);
            localStorage.setItem("image",res.data.success.image.encoded);
            localStorage.setItem("email",res.data.success.email);
          }
          else{
            sessionStorage.setItem("name",res.data.success.name);
            sessionStorage.setItem("image",res.data.success.image.encoded);
            sessionStorage.setItem("email",res.data.success.email);
          }
          setIsModalVisible(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // end of form

  //Upload image

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10 MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        console.log("image url", imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  //end upload image

  return (
    <Fragment>
      <header className="row tm-welcome-section mx-auto">
        <h2 className="col-12 text-center tm-section-title">My Account</h2>
        <p className="col-12 text-center">
          Donec sed orci fermentum, convallis lacus id, tempus elit. Sed eu
          neque accumsan, porttitor arcu a, interdum est. Donec in risus eu
          ante. Donec sed orci fermentum, convallis lacus id, tempus elit. Sed
          eu neque accumsan, porttitor arcu a, interdum est. Donec in risus eu
          ante.
        </p>
      </header>
      <div className="container mt-5" style={{backgroundColor:"transparent"}}>
        <div className="mx-auto mb-5">
          <Card
            title="Detail"
            headStyle={{ backgroundColor: "transparent" }}
            style={{backgroundColor:"transparent"}}
            extra={
              <a
                className="btn btn-light btn-sm"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showModal();
                }}
              >
                Edit
              </a>
            }
          >
            <div className="row">
              <div className="col-md-4">
                <Card>
                  <Statistic
                    title="Name"
                    value={
                      sessionStorage.name
                        ? sessionStorage.getItem("name")
                        : localStorage.getItem("name")
                    }
                    valueStyle={{ color: "black" }}
                    prefix={
                      getImage() == "not available" ? (
                        <Avatar icon={<UserOutlined />} className="mr-2"/>
                      ) : (
                        <Avatar
                          src={getImage()}
                          size="large"
                        />
                      )
                    }
                  />
                </Card>
              </div>
              <div className="col-md-4">
                <Card>
                  <Statistic
                    title="Email"
                    value={
                      sessionStorage.email
                        ? sessionStorage.getItem("email")
                        : localStorage.getItem("email")
                    }
                    valueStyle={{ color: "black" }}
                    prefix={<MailOutlined className="mr-2" />}
                  />
                </Card>
              </div>
              <div className="col-md-4">
                <Card>
                  <Statistic
                    title="Count of Order"
                    value={orders.length + " Orders done"}
                    valueStyle={{ color: "green" }}
                    prefix={<CopyOutlined className="ml-2" />}
                  />
                </Card>
              </div>
            </div>
          </Card>
          <Modal
            title="Edit profile"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
          >
            <Form
              {...layout}
              //ref={form}
              name="control-ref"
              onFinish={onFinish}
              initialValues={{
                name: localStorage.name || sessionStorage.name,
                email: localStorage.email || sessionStorage.email,
              }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Image" name="image">
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {getImage() !== "not available" ? (
                    <img
                      src={imageUrl?imageUrl:getImage()}
                      alt="image"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <h2 className="col-12 text-center tm-section-title my-3">My Orders</h2>
        <Select
          defaultValue="All Orders"
          style={{ width: 150, marginBottom: "8px" }}
          onChange={handleFilterChange}
        >
          {optionListForFilter}
        </Select>
        <Table 
          columns={columns} 
          dataSource={data} 
          bordered 
          rowClassName="bg-row"
        />
      </div>
      <Footer />
    </Fragment>
  );
};

export default MyOrders;
