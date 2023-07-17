import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeroSliderEightSingle = ({ data }) => {
  return (
    <div
      className="single-slider-2 slider-height-1 d-flex align-items-center slider-height-res hm-13-slider" style={{marginTop: "100px"}}
      // style={{
      //   backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`
      // }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="slider-content-13 slider-animated-1">
              <h5 className="animated slider-title">{data.title}</h5>
              <h3
                className="animated montserrat-header" 
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + data.url}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="slider-content-13 slider-animated-1">
              <div className="img-div">
              <img src={process.env.PUBLIC_URL + data.image} className="header-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderEightSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderEightSingle;
