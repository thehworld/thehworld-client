import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getABlog } from "../../apis/api";



const BlogSection = () => {

        const { bId } = useParams();

        const [blogDetails, setblogDetails] = useState([]);
        useEffect(() => {
            console.log("BID - ", bId);
        }, [])
        
        const getABlogDetails = () => {
            getABlog(bId).then((res) => {
                console.log("Blog - ", res);
                setblogDetails(res.data.blog);
            }).catch((err) => {
                console.log("Error - ", err);
            })
        }

        useEffect(() => {
            getABlogDetails()
        }, [])
        

        if(blogDetails.length < 1)
        return(
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
  </div>
            )
        else
        return(
          <div className="blog-details-wrapper ml-20" style={{
            marginRight:20,
            marginLeft:20
          }}>
        <Fragment>
        <div className="blog-details-top">
          <div className="blog-details-img">
            <img
              alt=""
              src={blogDetails.blogImages[0]}
            />
          </div>
          <div className="blog-details-content" style={{
            margin:10
          }}>
            <div className="blog-meta-2">
              <ul>
                <li>{blogDetails.createdAt}</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h3>{blogDetails.blogTitle}</h3>
            <p>
                {blogDetails.blogSubTitle}
            </p>
            <blockquote>
            {blogDetails.blogDescription}
            </blockquote>
            <p>
            {blogDetails.blogDescription}
            </p>
          </div>
        </div>
        <div className="dec-img-wrapper">
          <div className="row">
            <div className="col-md-6">
              <div className="dec-img mb-50">
                <img
                  alt=""
                  src={
                    blogDetails.blogImages[0]
                  }
                />
              </div>
            </div>
            
          </div>
          <div>
            {blogDetails.blogSubSections.map((blog, index) => {
                return(
            <>
            <p>
              <b>  {blog.title}</b>
          </p>
            <p>
                {blog.description}
          </p>
          </>
                )
                })}
          </div>
          
        </div>
        <div className="tag-share">
          <div className="dec-tag">
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                  Hair Care 
                </Link>
              </li>
            </ul>
          </div>
          <div className="blog-share">
            <span>share :</span>
            <div className="share-social">
              <ul>
                <li>
                  <a className="facebook" href="//facebook.com">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a className="twitter" href="//twitter.com">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a className="instagram" href="//instagram.com">
                    <i className="fa fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="next-previous-post">
          <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
            {" "}
            <i className="fa fa-angle-left" /> prev post
          </Link>
          <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
            next post <i className="fa fa-angle-right" />
          </Link>
        </div> */}
      </Fragment>
      </div>
    )
}


export default BlogSection;