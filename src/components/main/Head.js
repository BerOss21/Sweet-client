import React, { Fragment,useState,useEffect} from "react";
import {BrowserRouter,Link,Switch,Route} from "react-router-dom";
import axios from "axios";
import $ from "jquery";

const Head = (props) => {
  const [categories,setCategories]=useState("");
  useState(()=>{
      axios.get("/api/categories").then(res=>{
          console.log("categories",res.data);
          setCategories(res.data.categories);
      }).catch(err=>{
          console.log(err)
      });
  },[]);
  
  const categoriesList=categories.length?(categories.map((item)=>{
      return(
          <Fragment>
              <li className="tm-paging-item" key={item.id}>
                <a href="#" className="tm-paging-link" onClick={e=>{e.preventDefault();props.getCategory(item.id);$("a.tm-paging-link").removeClass("active");$(e.target).addClass("active")}}>
                  {item.name}
                </a>
              </li>
          </Fragment>
      )
  })):("No categories");

  return (
    <Fragment>
      <div>
        <header className="row tm-welcome-section mx-auto" >
          <h2 className="col-12 text-center tm-section-title">
            Welcome to Simple House
          </h2>
          <p className="col-12 text-center">
            Total 3 HTML pages are included in this template. Header image has a
            parallax effect. You can feel free to download, edit and use this
            TemplateMo layout for your commercial or non-commercial websites.
          </p>
        </header>
        <div className="tm-paging-links">
          <nav>
            <ul>
              {categoriesList}
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};


export default Head;