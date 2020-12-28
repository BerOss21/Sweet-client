import React, { Fragment, useEffect, useState } from "react";
import Footer from "./Footer";
import { Collapse, Carousel, message } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";

const { Panel } = Collapse;

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
  const [cart, setCart] = useState("");
  const [fresh, setFresh] = useState(false);


  useEffect(() => {
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
      })
      .catch((err) => {
        console.log("error", err);
      });
  },[]);
 useEffect(()=>{
   console.log("ShowFood")
 })
  useEffect(()=>{
    let contentArr=JSON.parse(sessionStorage.getItem("cartContent"));
    console.log("cart index",contentArr);
  },[fresh]);

  const handleAdd = (name,price,id,image) => {
    let content=sessionStorage.getItem("cartContent")?JSON.parse(sessionStorage.getItem("cartContent")):[];
    if(content.filter(item=>{return item.id==id}).length){
      message.warning("food already added")
    }
    else{
      content.push({id,name,price,image,qty:1});
      let contentString=JSON.stringify(content)
      sessionStorage.setItem("cartContent",contentString);
      message.success("Food added with success");
      props.history.push(props.location.pathname)
    }
  };
  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8" style={{ height: "80vh" }}>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>
                  <img src={image} width="100%" height="100%" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img src={image} width="100%" height="100%" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img src={image} width="100%" height="100%" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img src={image} width="100%" height="100%" />
                </h3>
              </div>
            </Carousel>
          </div>
          <div className="col-md-4 p-md-5">
            <div>
              <h2>{name}</h2>
              <h5 className="text-danger">{category}</h5>
              <p>{description}</p>
              <strong>{price} DHS</strong>
              <button
                className="btn btn-success"
                onClick={() => {
                  handleAdd(name,price,id,image);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="col-md-8">
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Comments" key="1">
                <p>text</p>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ShowFood;
