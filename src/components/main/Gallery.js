import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";

const { Meta } = Card;

const Gallery = (props) => {
  const [foods, setFoods] = useState([]);
  const [pagination, setPagination] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState("pizza");

  /*if(props.category){
    setCategory(props.category)
  }*/

  console.log("galery props", props.category);
  useEffect(() => {
    let url = props.category
      ? `/api/foods/list/${props.category}?page=${activePage}`
      : "/api/foods";
    axios
      .get(url)
      .then((res) => {
        console.log("data foods", res.data);
        if (props.category) {
          setFoods(res.data.foods.data);
          setTotalPage(res.data.foods.last_page);
          var paginat = [];
          for (var i = 1; i <= res.data.foods.last_page; i++) {
            paginat.push(i);
            console.log("pagination", paginat);
          }
          setPagination(paginat);
        } else {
          setFoods(res.data.foods);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activePage, props.category]);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  const paginationList =
    pagination.length > 1
      ? pagination.map((item) => {
          return (
            <li key={item} className="page-item">
              <a
                className="page-link"
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(item);
                }}
              >
                {item}
              </a>
            </li>
          );
        })
      : "";

  const handleShow = (food, id) => {
    props.history.push({ pathname: `/detail/${food}`, id });
  };
  const foodsList = foods
    ? foods.map((item) => {
        return (
          <Fragment>
            <div className="col-md-3 mb-4" key={item.id}>
            <Card     
              hoverable
              onClick={()=>{handleShow(item.name)}}
              style={{backgroundColor:"transparent"}}
              cover={
                <img
                  alt="example"
                  src={item.image.encoded}
                />
              }
            >
              <Meta
                title={item.name}
                description= {item.description.substr(0, 100)}
              />
               <Meta
                title={<span className="text-secondary">{item.category.name}</span>}
                className="mt-3"
              />
              <Meta
                title={<h4 className="text-danger">{item.price + " DH"}</h4>}
                className="mt-3"
              />
            </Card>
            </div>
          </Fragment>
        );
      })
    : "no foods";
  return (
    <Fragment>
      <div className="row tm-gallery">
        <div className=" mb-4 text-center col-12">
          <h6>
            {activePage}/{totalPage}{" "}
          </h6>
        </div>
        <div id="tm-gallery-page-pizza" className="tm-gallery-page col-10">
          {foodsList}
        </div>
        <div className="col-10 tm-gallery-page">
          <nav aria-label="Page navigation example">
            <ul className="pagination">{paginationList}</ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Gallery);
