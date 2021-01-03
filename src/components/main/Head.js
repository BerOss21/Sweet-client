import React, { Fragment,useState,useEffect} from "react";
import {BrowserRouter,Link,Switch,Route} from "react-router-dom";
import axios from "axios";
import { Spin } from 'antd';
import $ from "jquery";

const Head = (props) => {
  const [categories,setCategories]=useState("");
  const [loding,setLoding]=useState(false);
  useState(()=>{
      axios.get("/api/categories").then(res=>{
          let cat=res.data.categories;
          cat.unshift({id:0,name:"All"});
          setCategories(cat);
          setLoding(true);
      }).catch(err=>{
          console.log(err)
      });
  },[]);
  
  const categoriesList=categories.length?(categories.map((item)=>{
      return(
          <Fragment>
              <li className="tm-paging-item" key={item.id}>
                <a href="#" className={item.id==0?"tm-paging-link active":"tm-paging-link"} onClick={e=>{e.preventDefault();props.getCategory(item.id);$("a.tm-paging-link").removeClass("active");$(e.target).addClass("active")}}>
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
            Welcome to Sweets House
          </h2>
          <p className="col-12 text-center">
          Donec sed orci fermentum, convallis lacus id, tempus elit. Sed eu
          neque accumsan, porttitor arcu a, interdum est. Donec in risus eu
          ante. Donec sed orci fermentum, convallis lacus id, tempus elit. Sed
          eu neque accumsan, porttitor arcu a, interdum est. Donec in risus eu
          ante.
          </p>
        </header>
        <div className="tm-paging-links">
          <nav>
            <ul>
              {loding?categoriesList:(
                <div style={{
                  textAlign: "center",
                  background: "rgba(103, 82, 50, 0.05)",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  padding: "30px 50px",
                  margin: "20px 0"
                }}>
                <Spin />
              </div>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};


export default Head;