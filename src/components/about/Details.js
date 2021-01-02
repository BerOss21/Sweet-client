import React, { Fragment } from "react";

const Details = (props) => {
  return (
    <Fragment>
      <div>
        <div className="tm-container-inner tm-featured-image">
          <div className="row">
            <div className="col-12">
                <div className="parallax"></div>         
            </div>
          </div>
        </div>
        <div className="tm-container-inner tm-features">
          <div className="row">
            <div className="col-lg-4">
              <div className="tm-feature">
                <i className="fas fa-4x fa-pepper-hot tm-feature-icon" />
                <p className="tm-feature-description">
                  Donec sed orci fermentum, convallis lacus id, tempus elit. Sed
                  eu neque accumsan, porttitor arcu a, interdum est. Donec in
                  risus eu ante.
                </p>
                <a href="index.html" className="tm-btn tm-btn-default">
                  Read More
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tm-feature">
                <i className="fas fa-4x fa-seedling tm-feature-icon" />
                <p className="tm-feature-description">
                  Maecenas pretium rutrum molestie. Duis dignissim egestas
                  turpis sit. Nam sed suscipit odio. Morbi in dolor finibus,
                  consequat nisl eget.
                </p>
                <a href="index.html" className="tm-btn tm-btn-default">
                  Read More
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tm-feature">
                <i className="fas fa-4x fa-cocktail tm-feature-icon" />
                <p className="tm-feature-description">
                   Maecenas pretium rutrum molestie. Duis dignissim egestas
                  turpis sit. Nam sed suscipit odio. Morbi in dolor finibus,
                  consequat nisl eget.
                </p>
                <a href="index.html" className="tm-btn tm-btn-default">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="tm-container-inner tm-history mx-auto">
          <div className="row">
            <div className="col-12">
              <div className="tm-history-inner">
                <img
                  src="./../img/about-06.jpg"
                  alt="Image"
                  className="img-fluid tm-history-img "
                  width="40%"
                />
                <div className="tm-history-text">
                  <h4 className="tm-history-title">
                    Our History
                  </h4>
                  <p className="tm-mb-p">
                    Sed ligula risus, interdum aliquet imperdiet sit amet,
                    auctor sit amet justo. Maecenas posuere lorem id augue
                    interdum vehicula. Praesent sed leo eget libero ultricies
                    congue.
                  </p>
                  <p>
                      Maecenas pretium rutrum molestie. Duis dignissim egestas
                      turpis sit. Nam sed suscipit odio. Morbi in dolor finibus,
                      consequat nisl eget.
                  </p>
                  <p>
                  Maecenas pretium rutrum molestie. Duis dignissim egestas
                  turpis sit. Nam sed suscipit odio. Morbi in dolor finibus,
                  consequat nisl eget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Details;
