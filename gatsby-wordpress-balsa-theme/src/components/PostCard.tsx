import React from "react";
import { Link, navigate } from "gatsby";
import { PostDescription } from "../models/all-post-description.model";
import Img from "gatsby-image";

type PostCardTypes = {
  post: PostDescription;
};

const PostCard: React.FC<PostCardTypes> = ({ post }) => {
  const handleNavigation = (e: any, slug) => {
    e.stopPropagation();
    navigate(slug);
  };

  const excerpt =
    post.plainExcerpt.split(" ").length > 30
      ? post.plainExcerpt.split(" ").slice(0, 30).join(" ") + "..."
      : post.plainExcerpt;
  return (
    <div
      onClick={(e) => handleNavigation(e, `/${post.slug}`)}
      className="w-full lg:w-1/3 px-4 mb-8 cursor-pointer"
    >
      <div className="h-full rounded shadow-md flex flex-col justify-between">
        <div>
          {post.featured_media && (
            <Img
              className="mb-4 h-48 w-full object-cover rounded-t"
              fluid={post.featured_media.localFile.childImageSharp.fluid}
            />
          )}
          {!post.featured_media && (
            <div
              className="flex justify-center bg-blue-500 items-center text-white font-black mb-4 h-48 w-full object-cover rounded-t"
              style={{
                fontSize: "6rem",
              }}
            >
              {post.title[0]}
            </div>
          )}

          <div className="px-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                {post.date}
                {post.tags && post.tags.length > 0 && (
                  <span className="mx-2">•</span>
                )}
                <span className="text-gray-600">
                  {post.tags &&
                    post.tags.map((tag, i) => {
                      return (
                        <a
                          onClick={(e) =>
                            handleNavigation(e, `tag/${tag.slug}`)
                          }
                          key={i}
                          className="no-underline hover:underline mr-2"
                        >
                          #{tag.name}
                        </a>
                      );
                    })}
                </span>
              </p>
              <h3 className="text-2xl my-2 font-heading font-semibold tracking-tight leading-tight" dangerouslySetInnerHTML={{__html: post.title}}>
                
              </h3>
              <p className="text-gray-600 font-serif">{excerpt}</p>
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
            <small className="text-gray-500">{post.readingTime}</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
