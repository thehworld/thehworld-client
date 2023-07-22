import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc }) => {
  console.log("Product Des - ", productFullDesc);
  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="additionalInfo">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">How To?</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Description</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Key Ingredient</span> {
                        productFullDesc.productIngredient.length > 0 ? productFullDesc.productIngredient.map((des, index) => {
                          return <p>{des}</p>
                        }) : null
                      }
                    </li>
                    <li>
                      <span>Product Details</span>{
                        productFullDesc.productDetails.length > 0 ? productFullDesc.productDetails.map((des, index) => {
                          return <p>{des}</p> 
                        }) : null
                      }{" "}
                    </li>
                   
                    {/* <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li> */}
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {productFullDesc.howTo.length > 0 ? productFullDesc.howTo.map((prod, index) => {
                  return(
                    <p>
                      {prod}
                     </p> 
                  )
                }) : null }
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                {productFullDesc.productDescription ? productFullDesc.productDescription: null}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default ProductDescriptionTab;
