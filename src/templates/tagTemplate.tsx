import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { PaginationContext } from "../models/pagination.model";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { PostDescription } from "../models/all-post-description.model";
import WebsiteMeta from "../components/meta/website-meta";

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
      description: string;
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
      <WebsiteMeta />
      <section className="text-center bg-cover bg-center">
        <div className="relative flex items-center py-32">
          <div className="absolute bg-primaryActive inset-0" />
          <div className="z-10 max-w-2xl mx-auto px-4">
            <span className="text-sm leading-tight font-sansNormal text-white opacity-70 uppercase">
              {wordpressTag.count} {wordpressTag.count > 1 ? "posts" : "post"}
            </span>
            <h1 className="mb-4 mt-2 text-3xl leading-tight font-sansSemibold text-white break-words">
              {wordpressTag.name}
            </h1>
            {wordpressTag.description && (
              <p
                className="text-xl font-serifLight text-white opacity-85"
                dangerouslySetInnerHTML={{ __html: wordpressTag.description }}
              ></p>
            )}
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
    </Layout>
  );
};

export default TagTemplate;

export const TagTemplateQuery = graphql`
  query($slug: String!, $limit: Int!, $skip: Int!) {
    wordpressTag(slug: { eq: $slug }) {
      name
      count
      description
    }
    allWordpressPost(
      filter: { tags_custom: { elemMatch: { slug: { eq: $slug } } } }
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
