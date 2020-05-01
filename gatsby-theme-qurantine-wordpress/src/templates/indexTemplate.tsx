import React from "react";
import Layout from "../components/Layout";
import CtaBig from "../components/CtaBig";
import { graphql } from "gatsby";
import { AllGhostPostDescription } from "../models/all-post-description.model";
import { PaginationContext } from "../models/pagination.model";
import { MetaData } from "../components/meta";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

type IndexPageProps = {
  data: {
    allGhostPost: AllGhostPostDescription;
    ghostSettings: {
      title: string;
      description: string;
      cover_image: string;
    };
  };
  location: any;
  pageContext?: PaginationContext;
};

const IndexPage: React.FC<IndexPageProps> = ({
  data,
  location,
  pageContext,
}) => {
  const { allGhostPost, ghostSettings } = data;

  return (
    <Layout>
      <MetaData data={data} location={location} />
      <section
        className="text-center bg-cover"
        style={{
          backgroundImage: `url(${
            ghostSettings.cover_image
              ? ghostSettings.cover_image
              : "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"
          })`,
        }}
      >
        <div className="relative flex items-center py-32">
          <div className="absolute bg-black opacity-50 inset-0" />
          <div className="z-10 max-w-2xl mx-auto px-4">
            <h1 className="mb-4 text-4xl leading-tight font-semibold font-heading text-white">
              {ghostSettings.title}
            </h1>
            <p className="text-2xl leading-tight font-light text-white">
              {ghostSettings.description}
            </p>
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

      {/* Pagination */}
      <Pagination pageContext={pageContext} />
      <CtaBig />
    </Layout>
  );
};

export default IndexPage;

export const indexPageQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { slug: { ne: "data-schema" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        ...AllGhostPostsDescription
      }
    }

    ghostSettings {
      title
      description
      cover_image
    }
  }
`;
