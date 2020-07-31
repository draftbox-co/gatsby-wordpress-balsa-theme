import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { PaginationContext } from "../models/pagination.model";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import userAvatar from "../images/female_avatar.svg";
import { PostDescription } from "../models/all-post-description.model";
import { AuthorDescription } from "../models/author-description.model";
import WebsiteMeta from "../components/meta/website-meta";

type AuthorTemplateProps = {
  data: {
    allWordpressPost: {
      edges: {
        node: PostDescription;
      }[];
    };
    wordpressWpUsers: AuthorDescription;
  };
  location: any;
  pageContext?: PaginationContext;
};

const AuthorTemplate: React.FC<AuthorTemplateProps> = ({
  data,
  location,
  pageContext,
}) => {
  const { allWordpressPost, wordpressWpUsers } = data;
  return (
    <Layout>
      <WebsiteMeta />
      <section className="text-center bg-cover">
        <div className="relative flex items-center py-32">
          <div className="absolute bg-primaryActive inset-0"></div>
          <div className="z-10 max-w-2xl mx-auto px-4">
            <img
              className="w-16 mx-auto mb-4 rounded-full"
              src={
                wordpressWpUsers.avatar_urls?.wordpress_96
                  ? wordpressWpUsers.avatar_urls.wordpress_96
                  : userAvatar
              }
              alt=""
            />
            <h3 className="text-3xl font-sansSemibold text-white">
              {wordpressWpUsers.name}
            </h3>
            {/* <span className="text-lg font-semibold font-heading text-white">
              Regional Manager
            </span> */}
            {wordpressWpUsers.description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: wordpressWpUsers.description,
                }}
                className="mt-4 text-gray-100 leading-relaxed break-words"
              ></p>
            )}
          </div>
        </div>
      </section>
      <div className="spacer my-8"></div>
      <section className="px-4 container mx-auto">
        <div className="flex justify-center flex-wrap -mx-4">
          {allWordpressPost.edges.map(({ node }, i) => {
            return <PostCard post={node} key={i} />;
          })}
        </div>
      </section>
      <Pagination pageContext={pageContext} />
    </Layout>
  );
};

export default AuthorTemplate;

export const pageQuery = graphql`
  query($slug: String!, $limit: Int!, $skip: Int!) {
    wordpressWpUsers(slug: { eq: $slug }) {
      ...WordpressAuthorData
    }
    allWordpressPost(
      filter: { author: { slug: { eq: $slug } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...WordPressPostData
        }
      }
    }
  }
`;
