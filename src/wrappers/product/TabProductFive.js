import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGridTwo from "./ProductGridTwo";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllCategories, getAllProductsFromCategory } from "../../apis/api";
import { CircularProgress } from "@mui/material";

const product = [
  {
    id: "1",
    name: "Hair Gel",
    price: "489",
    stock: "20",
    discount: "0",
    image: [
      "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.webp?alt=media&token=c6b985fd-7dd2-442c-8c3a-cd2a22842f95",
      "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.webp?alt=media&token=c6b985fd-7dd2-442c-8c3a-cd2a22842f95",
      "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.webp?alt=media&token=c6b985fd-7dd2-442c-8c3a-cd2a22842f95",
    ],
    description: "this a herbal hair gel made with vital herbs."
  },
  {
    id: "2",
    name: "Hair Serum",
    price: "368",
    stock: "20",
    discount: "0",
    image: [
      "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.jpg?alt=media&token=762749f0-cec2-473c-a1e8-e10fa46c882f",
      "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.jpg?alt=media&token=762749f0-cec2-473c-a1e8-e10fa46c882f",
      "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.jpg?alt=media&token=762749f0-cec2-473c-a1e8-e10fa46c882f",
    ],
    description: "this a herbal hair Serum made with vital herbs."
  }
]

const TabProductFive = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  productTabClass
}) => {


  // All Categories
  const [allCategories, setallCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);


  const getAllCategoryHandler = () => {
    setisLoading(true)  
    getAllCategories().then((res) => {
          if(res){
            setallCategories(res);
            setisLoading(false);  
          }
      }).catch((err) => {

      })
  }

  const [categoryIdForProductDetails, setcategoryIdForProductDetails] = useState("");
  
  const [productDetails, setproductDetails] = useState([]);
  const getAProductDetails = (e, id) => {
        e.preventDefault();
        setcategoryIdForProductDetails(id);
        getAllProductsFromCategory(id).then((res) => {
              console.log("All Products From Category - ", res);
              setproductDetails(res);
        }).catch((err) => {
              console.log(err);
        })
  }


  useEffect(() => {
      getAllCategoryHandler()
  }, [])
  


  return (
    <div className={clsx("product-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <Tab.Container defaultActiveKey="newArrival">
          <Nav
            variant="pills"
            className={clsx("product-tab-list-2 mb-60", productTabClass)}
          >
            {isLoading ? (
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <CircularProgress color="success" />
            </div>
            ) : (
                <>
                {allCategories && allCategories.map((cate, index) => {
                    return(
                <Nav.Item onClick={(e) => getAProductDetails(e, cate._id)}>
                  <Nav.Link eventKey="newArrival">
                    <h3>{cate.categoryName}</h3>
                  </Nav.Link>
                </Nav.Item>
                    )
                })
                }
                </>
            )}
          
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGridTwo
                  category={category}
                  type="new"
                  limit={8}
                  product={product}
                  spaceBottomClass="mb-25"
                  categoryProduct={productDetails}
                />
              </div>
            </Tab.Pane>
            
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductFive.propTypes = {
  category: PropTypes.string,
  productTabClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TabProductFive;
