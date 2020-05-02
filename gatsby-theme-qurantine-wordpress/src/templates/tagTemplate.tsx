import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { PaginationContext } from "../models/pagination.model";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import CtaBig from "../components/CtaBig";
import randomColor from "randomcolor";
import { PostDescription } from "../models/all-post-description.model";

type TagTemplateProps = {
  location: any;
  pageContext: PaginationContext;
  data: {
    allWordpressPost: {
      edges: { node: PostDescription }[];
    };
    wordpressTag: {
      name: string;
      count: number;
    };
  };
};

const TagTemplate: React.FC<TagTemplateProps> = ({
  data,
  location,
  pageContext,
}) => {
  const { wordpressTag, allWordpressPost } = data;
  return (
    <Layout>
      <section
        className="text-center bg-cover"
        style={{
          background: randomColor({ luminosity: "dark" }),
        }}
      >
        <div className="relative flex items-center py-32">
          <div className="absolute bg-black opacity-50 inset-0" />
          <div className="z-10 max-w-2xl mx-auto px-4">
            <h3 className="text-3xl font-semibold font-heading text-white capitalize">
              {wordpressTag.name}
            </h3>
            <span className="font-semibold font-heading text-white">
              {wordpressTag.count} {wordpressTag.count > 1 ? "posts" : "post"}
            </span>
          </div>
        </div>
      </section>
      <div className="my-8"></div>
      <section className="px-4 container mx-auto">
        <div className="flex justify-center flex-wrap -mx-4">
          {allWordpressPost.edges.map(({ node }, i) => {
            return <PostCard post={node} key={i} />;
          })}
        </div>
      </section>
      <Pagination pageContext={pageContext} />
      <CtaBig />
    </Layout>
  );
};

export default TagTemplate;

export const TagTemplateQuery = graphql`
  query($slug: String!, $limit: Int!, $skip: Int!) {
    wordpressTag(slug: { eq: $slug }) {
      name
      count
    }
    allWordpressPost(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
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
