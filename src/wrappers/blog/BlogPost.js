import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "/assets/img/blog/hairoil.webp"}
          />
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>22 April, 2023</li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  4 <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h3>The H World's Herbal Hair Oil: Natural Nourishment for Your Locks</h3>
          <p>
          Healthy and lustrous hair is something that everyone desires. But with the increasing use of chemical-based products and pollution, our hair is exposed to damage, leading to hair fall, dryness, and other hair-related problems. This is where The H World's Herbal Hair Oil comes into the picture.
          </p>
          <blockquote>
          The H World is a company that specializes in creating natural and organic products. Their Herbal Hair Oil is a blend of various herbs and essential oils that work wonders for your hair. Let's take a closer look at the ingredients and benefits of this hair oil.
          </blockquote>
          <p>
          If you're looking for a natural and effective solution for your hair problems, The H World's Herbal Hair Oil is an excellent choice. With its blend of natural and organic ingredients, this hair oil provides the nourishment and care that your hair needs. So, switch to this herbal hair oil today and say goodbye to hair fall, dandruff, and other hair problems.
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
                  process.env.PUBLIC_URL + "/assets/img/blog/hairoil.webp"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL + "/assets/img/blog/hairoil.webp"
                }
              />
            </div>
          </div>
        </div>
        <p>
        The H World is a company that specializes in creating natural and organic products. Their Herbal Hair Oil is a blend of various herbs and essential oils that work wonders for your hair. Let's take a closer look at the ingredients and benefits of this hair oil.
        </p>
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
      <div className="next-previous-post">
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          {" "}
          <i className="fa fa-angle-left" /> prev post
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          next post <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost;
