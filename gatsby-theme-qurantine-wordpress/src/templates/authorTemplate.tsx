import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { AllGhostPostDescription } from "../models/all-post-description.model";
import { PaginationContext } from "../models/pagination.model";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { AuthorDescription } from "../models/author-description.model";
import userAvatar from "../images/female_avatar.svg";

type AuthorTemplateProps = {
  data: {
    allGhostPost: AllGhostPostDescription;
    ghostAuthor: AuthorDescription;
  };
  location: any;
  pageContext?: PaginationContext;
};

const AuthorTemplate: React.FC<AuthorTemplateProps> = ({
  data,
  location,
  pageContext,
}) => {
  const { allGhostPost, ghostAuthor } = data;
  return (
    <Layout>
      <section
        className="text-center bg-cover"
        style={{ backgroundColor: "pink" }}
      >
        <div className="relative flex items-center py-32">
          <div className="absolute bg-black opacity-50 inset-0"></div>
          <div className="z-10 max-w-2xl mx-auto px-4">
            <img
              className="w-1/5 mx-auto mb-4 rounded-full"
              src={
                ghostAuthor.profile_image
                  ? ghostAuthor.profile_image
                  : userAvatar
              }
              alt=""
            />
            <h3 className="text-3xl font-semibold font-heading text-white">
              {ghostAuthor.name}
            </h3>
            {/* <span className="text-lg font-semibold font-heading text-white">
              Regional Manager
            </span> */}
            {ghostAuthor.bio && (
              <p className="mt-4 text-gray-100 leading-relaxed">
                Started as a Sales representative at Stamford branch, moved to
                Scranton. All of us left as soon as possible except for Andy.
              </p>
            )}
          </div>
        </div>
      </section>
      <div className="spacer my-8"></div>
      <section className="px-4 container mx-auto">
        <div className="flex justify-center flex-wrap -mx-4">
          {allGhostPost.edges.map(({ node }, i) => {
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
  query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostAuthor(slug: { eq: $slug }) {
      ...GhostAuthorDetails
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        ...AllGhostPostsDescription
      }
    }
  }
`;
