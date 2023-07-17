import React, { Fragment } from "react"; 
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useState } from "react";
import { useEffect } from "react";
import { getAProductDetail, getAllProductsFromCategory } from "../../apis/api";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  console.log(id)

  const [productData, setproductData] = useState(null);

  const getProductDetailsFromId = () => {
    if(id){
      console.log('id -> ',id);
      getAProductDetail(id).then((res) => {
        console.log("Product res- ", res.data.product);
        setproductData(res.data.product);
      }).catch((err) => {
        console.log("error - ", err);
      })
    }
  }


  useEffect(() => {
    if(id)
    getProductDetailsFromId();
  }, [id])
  
  if(productData)
  return (
    <Fragment>
     
      <SEO
        titleTemplate={productData.productName}
        description={productData.productDescription}
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}    
        {/* <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Shop Product", path: process.env.PUBLIC_URL + productData.productName }
          ]} 
        /> */}


        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={productData}
          galleryType="left"
        />

        {/* <p>
          {productData.productName}
        </p> */}

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={productData}
        />

   
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
