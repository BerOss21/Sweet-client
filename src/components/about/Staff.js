import React, { Fragment, useState,useEffect } from "react";
import axios from "axios";

const Staff = (props) => {
  const [staffs, setStaffs] = useState("");
  useEffect(() => {
    axios
      .get("/api/staffs/")
      .then(res => {
        setStaffs(res.data.staffs);
      })
      .catch((err) => {
        console.log("error", err);
      });
  },[]);

  const staffsList=staffs?(
      staffs.map((item)=>{
          return(
              <Fragment>
                   <article className="col-md-6" key={item.id}>
                        <figure className="tm-person">
                        <img
                            src={item.image.encoded}
                            alt="Image"
                            className="img-fluid tm-person-img"
                           style={{height:"50vh",width:"50%"}}
                        />
                        <figcaption className="tm-person-description">
                            <h4 className="tm-person-name">{item.first_name} {item.last_name}</h4>
                            <p class="tm-person-title">{item.job}</p>
                            <p className="tm-person-about">
                              {item.description}
                            </p>
                            <div>
                            <a href={item.facebook} className="tm-social-link">
                                <i className="fab fa-facebook tm-social-icon" />
                            </a>
                            <a href={item.instagram} className="tm-social-link">
                                <i className="fab fa-instagram tm-social-icon" />
                            </a>
                            </div>
                        </figcaption>
                        </figure>
                    </article>
              </Fragment>
          )
      })
  ):("no sttaf");
  return (
    <Fragment>
      <div className="tm-container-inner tm-persons">
        <div className="row">
            {staffsList}
        </div>
      </div>
    </Fragment>
  );
};


export default Staff;