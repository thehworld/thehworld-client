import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import clsx from "clsx";
import blogFeaturedData from "../../data/blog-featured/blog-featured.json";
import BlogFeaturedSingle from "../../components/blog-featured/BlogFeaturedSingle";
import SectionTitle from "../../components/section-title/SectionTitle";
import { getAllBlogs } from "../../apis/api";
import { Link } from "react-router-dom";


const BlogFeatured = ({ spaceTopClass, spaceBottomClass }) => {


  const [allBlogs, setallBlogs] = useState([]);


  const getAllBlogsHandler = () => {
    getAllBlogs().then((res) => {
        console.log("Blogs - ", res);
        setallBlogs(res.data.blog);
    }).catch((error) => {
        console.log("Error - ", error);
    })
  }


  useEffect(() => {
    getAllBlogsHandler()
  }, [])
  


  return (
    <>
    <div className={clsx("blog-area", spaceTopClass, spaceBottomClass)}>
      {/* <div className="container">
        <SectionTitle
          titleText="OUR BLOG"
          positionClass="text-center"
          spaceClass="mb-55"
        />
        <div className="row">
          {blogFeaturedData?.map(singlePost => (
            <div className="col-lg-4 col-sm-6" key={singlePost.id}>
              <BlogFeaturedSingle singlePost={singlePost} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
    <div className={clsx("blog-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText="OUR BLOG"
          positionClass="text-center"
          spaceClass="mb-55"
        />
        <div className="row">
          {allBlogs?.map(singlePost => (
            <div className="col-lg-4 col-sm-6" key={singlePost.id}>
              {console.log(singlePost)}
              <div className="blog-wrap mb-30 scroll-zoom">
      <div className="blog-img">
        <Link to={process.env.PUBLIC_URL + "/blog/" + singlePost.blogsId}>
          <img src={singlePost.blogImages[0]} alt="" />
        </Link>
     
      </div>
      <div className="blog-content-wrap">
        <div className="blog-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/blog/" + singlePost.blogsId}>
              {singlePost.blogTitle}
            </Link>
          </h3>
          <span>
            {/* By{" "}
            <Link to={process.env.PUBLIC_URL + singlePost.authorUrl}>
              {singlePost.author}
            </Link> */}
          </span>
        </div>
      </div>
    </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

BlogFeatured.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BlogFeatured;
