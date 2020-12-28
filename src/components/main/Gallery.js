import React, { Fragment, useEffect, useState } from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

const Gallery = (props) => {
  const [foods, setFoods] = useState([]);
  const [pagination, setPagination] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState("pizza");

  /*if(props.category){
    setCategory(props.category)
  }*/
 
  console.log("galery props",props.category);
  useEffect(() => {
      let url=props.category?`/api/foods/list/${props.category}?page=${activePage}`:"/api/foods"
    axios
      .get(url)
      .then((res) => {
        console.log("data foods",res.data);
        if(props.category){
          setFoods(res.data.foods.data);
          setTotalPage(res.data.foods.last_page);
          var paginat=[];
          for(var i=1;i<=res.data.foods.last_page;i++){
              paginat.push(i);
              console.log("pagination",paginat)
          }  
          setPagination(paginat); 
        }
        else{
          setFoods(res.data.foods);
        }          
      }).catch((err) => {
        console.log(err);
      });
  },[activePage,props.category]);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  const paginationList=pagination.length>1?(
      pagination.map(item=>{
          return(
            <li key={item} className="page-item"><a className="page-link" href="" onClick={(e)=>{e.preventDefault();handlePageChange(item)}}>{item}</a></li>
          )
      })
  ):("");

  const handleShow=food=>{
    props.history.push(`/detail/${food}`)
  }
  const foodsList = foods
    ? foods.map((item) => {
        return (
          <Fragment>
            <article
              key={item.id}
              className="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item"
            >
              <figure>
                <img
                  src={item.image.encoded}
                  alt="Image"
                  className="img-fluid tm-gallery-img"
                />
                <figcaption>
                  <h4 className="tm-gallery-title">{item.name}</h4>
                  <p className="tm-gallery-description">{item.description.substr(0,100)}</p>
                  <p className="tm-gallery-price">{item.price} DHS</p>
                  <button className="btn btn-success btn-small rounded" onClick={()=>{handleShow(item.name)}}>More</button>
                </figcaption>
              </figure>
            </article>
          </Fragment>
        );
      })
    : "no foods";
  return (
    <Fragment>
      <div className="container mb-4">Page {activePage}/{totalPage}</div>
      <div className="row tm-gallery">
        <div id="tm-gallery-page-pizza" className="tm-gallery-page col-10">
          {foodsList}
        </div>
        <div className="col-10 tm-gallery-page">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                {paginationList}
                </ul>
            </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Gallery);
