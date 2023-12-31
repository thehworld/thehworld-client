import React, { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import HeroSliderEight from "../../wrappers/hero-slider/HeroSliderEight";
import FeatureIconThree from "../../wrappers/feature-icon/FeatureIconThree";
import BannerNine from "../../wrappers/banner/BannerNine";
import TabProductFive from "../../wrappers/product/TabProductFive";
import { makeStatusUpdateView } from "../../apis/api";

const HomeCosmetics = () => {


  const makeStatsUpdate = () => {
    makeStatusUpdateView().then((res) => {
        console.log("E-Commerce Views - ", res);
    }).catch((error) => {
        console.log("Error - ", error);
    })
  }

  useEffect(() => {
      makeStatsUpdate()
  }, [])



  return (
    <Fragment>
      <SEO
        titleTemplate="Cosmetics Home"
        description="The H World - Hair Care"
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
      >
        <HeroSliderEight />
        <TabProductFive
          spaceTopClass="pt-95"
          spaceBottomClass="pb-70"
          category="cosmetics"
        />
        {/* feature icon */}
        <FeatureIconThree
          spaceBottomClass="pb-70"
          featureShapeClass="support-shape-3"
        />
        {/* testimonial */}
        <TestimonialOne spaceBottomClass="pb-95" />
        {/* banner */}
        <BannerNine spaceBottomClass="pb-70" />
        {/* brand logo slider */}
        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
    
      </LayoutOne>
    </Fragment>
  );
};

export default HomeCosmetics;
