import React, { Fragment, useEffect, useState } from "react";
import Footer from "./Footer";
import "./css/all.min.css";
import "./css/templatemo-style.css";
import "./ShowFood.css";
import {
  Collapse,
  Carousel,
  message,
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Image,
  Spin,
} from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const { TextArea } = Input;
const { Panel } = Collapse;

const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ShowFood = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [gallery, setGallery] = useState("");
  const [fresh, setFresh] = useState(false);
  const [spinning, setSpinning] = useState(true);

  ////////////////////////////// get token and id

  const getToken = () => {
    return localStorage.token
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
  };

  const getCustomerId =
    sessionStorage.isAdmin || localStorage.isAdmin
      ? (_) => 0
      : (_) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`/api/foods/${props.match.params.food}`)
      .then((res) => {
        console.log("data", res.data.food);
        setId(res.data.food[0].id);
        setName(res.data.food[0].name);
        setDescription(res.data.food[0].description);
        setPrice(res.data.food[0].price);
        setCategory(res.data.food[0].category.name);
        setImage(res.data.food[0].image.encoded);
        setGallery(res.data.food[0].gallery);
        setComments(res.data.food[0].comments);
        setSpinning(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [fresh]);

  const handleAdd = (name, price, id, image) => {
    if (getToken()) {
      let content = sessionStorage.getItem("cartContent")
        ? JSON.parse(sessionStorage.getItem("cartContent"))
        : [];
      if (
        content.filter((item) => {
          return item.id == id;
        }).length
      ) {
        message.warning("food already added");
      } else {
        content.push({ id, name, price, image, qty: 1 });
        let contentString = JSON.stringify(content);
        sessionStorage.setItem("cartContent", contentString);
        message.success("Food added with success");
        props.history.push(props.location.pathname);
      }
    } else {
      message.warning("You should be login");
    }
  };

  const deleteComment = (id) => {
    let token = getToken();
    axios
      .delete(`/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setFresh(!fresh);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const data = comments.length
    ? comments.map((item) => {
        return {
          actions:
            getCustomerId() == 0 || getCustomerId() == item.customer_id
              ? [
                  <span
                    className="text-danger"
                    key={item.id}
                    onClick={() => {
                      deleteComment(item.id);
                    }}
                  >
                    Delete
                  </span>,
                ]
              : [],
          author: item.customer.name,
          avatar:
            item.customer_id == 0 ? (
              <Avatar icon={<UserOutlined />} />
            ) : (
              <Avatar src={<Image src={item.customer.image.encoded} />} />
            ),
          content: <p>{item.content}</p>,
          datetime: <span>{item.created_at}</span>,
        };
      })
    : [];

  const handleChange = (v) => {
    setContent(v.target.value);
    console.log("value", v.target.value);
  };

  const handleSubmit = (_) => {
    let token = getToken();
    axios
      .post(
        "/api/comments",
        {
          content: content,
          customer_id: getCustomerId(),
          food_id: id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.success) {
          setContent("");
          setFresh(!fresh);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const carouselList = gallery
    ? gallery.map((item) => {
        return (
          <div>
            <h3 style={contentStyle}>
              <img src={item.encoded} width="100%" height="100%" />
            </h3>
          </div>
        );
      })
    : "";
  return (
    <Fragment>
      <div className="container bg-transparent mt-5">
        <div className="row">
          <div className="col-md-8" style={{ height: "80vh" }}>
            <Spin tip="Loading..." spinning={spinning}>
              <Carousel autoplay>{carouselList}</Carousel>
            </Spin>
          </div>
          <div className="col-md-4 p-md-5">
            <Spin tip="Loading..." spinning={spinning}>
              <div>
                <h5 className="text-danger">{category}</h5>
                <h4>{name}</h4>
                <h1 style={{ fontWeight: "bolder", color: "brown" }}>
                  {price} DHS
                </h1>
                <p>{description}</p>
                {((sessionStorage.token && !sessionStorage.isAdmin) ||
                  (localStorage.token && !localStorage.isAdmin)) && (
                  <button
                    className="tm-btn tm-btn-default w-100"
                    onClick={() => {
                      handleAdd(name, price, id, image);
                    }}
                    style={{ fontSize: "20px" }}
                  >
                    <ShoppingCartOutlined />{" "}
                    <span style={{ verticalAlign: "sub" }}>Add to cart</span>
                  </button>
                )}
              </div>
            </Spin>
          </div>
          <div className="col-md-8">
            <Spin tip="Loading..." spinning={spinning}>
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Comments" key="1">
                  <List
                    className="comment-list"
                    header={`${data.length} comments`}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                      <li>
                        <Comment
                          actions={item.actions}
                          author={item.author}
                          avatar={item.avatar}
                          content={item.content}
                          datetime={item.datetime}
                        />
                      </li>
                    )}
                  />
                  {localStorage.token || sessionStorage.token ? (
                    <Comment
                      avatar={
                        localStorage.isAdmin || sessionStorage.isAdmin ? (
                          <Avatar icon={<UserOutlined />} />
                        ) : (
                          <Avatar src={<Image src={getImage()} />} />
                        )
                      }
                      content={
                        <Editor
                          onChange={handleChange}
                          onSubmit={handleSubmit}
                          value={content}
                        />
                      }
                    />
                  ) : (
                    <div className="alert alert-warning text-center mx-auto">
                      You should <Link to="/login"> login </Link> to comment
                    </div>
                  )}
                </Panel>
              </Collapse>
            </Spin>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ShowFood;
