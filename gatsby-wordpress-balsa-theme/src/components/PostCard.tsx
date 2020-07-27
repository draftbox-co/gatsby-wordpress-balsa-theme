import React from "react";
import { Link, navigate } from "gatsby";
import { PostDescription } from "../models/all-post-description.model";
import Img from "gatsby-image";
import starSVG from "./../images/star.svg";

type PostCardTypes = {
  post: PostDescription;
};

const PostCard: React.FC<PostCardTypes> = ({ post }) => {
  const handleNavigation = (e: any, slug) => {
    e.stopPropagation();
    navigate(slug);
  };

  let excerpt = "";

  if (post.excerpt) {
    excerpt =
      post.plainExcerpt.split(" ").length > 30
        ? post.plainExcerpt.split(" ").slice(0, 30).join(" ") + "..."
        : post.plainExcerpt;
  }

  return (
    <div
      onClick={(e) => handleNavigation(e, `/${post.slug}`)}
      className="w-full lg:w-1/3 px-4 mb-8 cursor-pointer relative"
    >
      {post.sticky && (
        <span
          className="absolute bg-white rounded-full px-2 py-1 text-xs font-semibold z-10 flex items-center"
          style={{ right: "20px", top: "5px" }}
        >
          <span className="mr-1">
            <img src={starSVG} alt="Featured" className="h-3 w-3"></img>
          </span>
          Featured
        </span>
      )}
      <div className="h-full rounded shadow-md flex flex-col justify-between hover:shadow-2xl">
        <div>
          {post.featured_media?.localFile?.childImageSharp?.fluid && (
            <Img
              className="mb-4 h-48 w-full object-cover rounded-t"
              fluid={post.featured_media.localFile.childImageSharp.fluid}
            />
          )}
          {!post.featured_media?.localFile?.childImageSharp &&
            post.featured_media?.localFile?.publicURL && (
              <img
                className="mb-4 h-48 w-full object-cover rounded-t"
                src={post.featured_media.localFile.publicURL}
              />
            )}
          {!post.featured_media?.localFile?.childImageSharp?.fluid &&
            !post.featured_media?.localFile.publicURL && (
              <div
                className="flex justify-center bg-blue-500 items-center text-white font-black mb-4 h-48 w-full object-cover rounded-t"
                style={{
                  fontSize: "6rem",
                }}
                dangerouslySetInnerHTML={{ __html: post.title[0] }}
              ></div>
            )}

          <div className="px-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 break-words">
                {post.date}
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">
                      <a
                        onClick={(e) =>
                          handleNavigation(e, `tag/${post.tags[0].slug}`)
                        }
                        className="no-underline hover:underline mr-2"
                      >
                        #{post.tags[0].name}
                      </a>
                    </span>
                  </>
                )}
              </p>
              <Link to={`/${post.slug}`}
                className="text-2xl my-2 font-heading font-semibold tracking-tight leading-tight break-words"
                dangerouslySetInnerHTML={{ __html: post.title }}
              ></Link>
              <p
                className="text-gray-600 font-serif break-words font-light"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              ></p>
            </div>
          </div>
        </div>
        <div className="my-4 flex justify-between px-6">
          <a
            onClick={(e) => handleNavigation(e, `/author/${post.author.slug}`)}
            className="text-gray-600 no-underline hover:underline"
          >
            <small>{post.author.name}</small>
          </a>
          {post.readingTime && (
            <small className="text-gray-600">{post.readingTime}</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
