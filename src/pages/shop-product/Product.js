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
import { getAllProductsFromCategory } from "../../apis/api";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  console.log(id)
  const products = [
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
  // const product = products.find(product => ( product.id === id ));
  // console.log("Product - ", product, id) 

  const [product, setproduct] = useState([]);
  useEffect(() => {
    getAllProductsFromCategory(id).then((res) => {
      console.log(res);
      setproduct(res);
    }).catch((err) => {

    })
  }, [id])
  


  return (
    <Fragment>
      {
        console.log("Product -> ", product)
      }
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}    
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />


        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.productDescription}
        />

   
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
