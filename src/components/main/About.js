import React, { Fragment } from "react";

const About = (props) => {
  return (
    <Fragment>
      <div className="tm-section tm-container-inner">
        <div className="row">
          <div className="col-md-6">
            <figure className="tm-description-figure">
              <img src="img/img-01.jpg" alt="Image" className="img-fluid" />
            </figure>
          </div>
          <div className="col-md-6">
            <div className="tm-description-box">
              <h4 className="tm-gallery-title">Maecenas nulla neque</h4>
              <p className="tm-mb-45">
                Donec sed orci fermentum, convallis lacus id, tempus elit. Sed
                eu neque accumsan, porttitor arcu a, interdum est. Donec in
                risus eu ante. Donec sed orci fermentum, convallis lacus id,
                tempus elit. Sed eu neque accumsan, porttitor arcu a, interdum
                est. Donec in risus eu ante.
              </p>
              <a href="" className="tm-btn tm-btn-default tm-right">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
