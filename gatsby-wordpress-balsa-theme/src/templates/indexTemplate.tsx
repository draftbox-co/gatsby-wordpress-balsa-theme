import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { PostDescription } from "../models/all-post-description.model";
import { PaginationContext } from "../models/pagination.model";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import WebsiteMeta from "../components/meta/website-meta";
import url from "url";
import classNames from "classnames";
import CtaMini from "../components/CtaMini";

type IndexPageProps = {
  data: {
    // allGhostPost: AllGhostPostDescription;
    // ghostSettings: {
    //   title: string;
    //   description: string;
    //   cover_image: string;
    // };
    allWordpressPost: {
      edges: {
        node: PostDescription;
      }[];
    };
    site: {
      siteMetadata: {
        siteTitle: string;
        siteDescription: string;
        coverUrl: string;
        siteUrl: string;
      };
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
  const { site, allWordpressPost } = data;

  const backgroundImage = site.siteMetadata.coverUrl
    ? url.resolve(site.siteMetadata.siteUrl, site.siteMetadata.coverUrl)
    : null;

  return (
    <>
      <Layout>
        <WebsiteMeta />
        <section
          className="text-center bg-cover max-w-full"
          style={{
            backgroundImage: `url(${
              backgroundImage ? backgroundImage : "none"
            })`
          }}
        >
          <div className="relative flex items-center py-32">
            <div className={classNames("absolute inset-0", {
              "bg-black opacity-50": backgroundImage,
              "bg-primaryActive": !backgroundImage,
            })}/>
            <div className="z-10 max-w-2xl mx-auto px-4">
              <h1
                dangerouslySetInnerHTML={{
                  __html: site.siteMetadata.siteTitle,
                }}
                className="mb-4 text-4xl leading-tight font-sansSemibold text-white break-words"
              ></h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: site.siteMetadata.siteDescription,
                }}
                className="text-2xl leading-tight font-light text-white"
              ></p>
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

        {/* Pagination */}
        <Pagination pageContext={pageContext} />
        <CtaMini/>
      </Layout>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query WordpressQuery($skip: Int!, $limit: Int!) {
    allWordpressPost(
      sort: { fields: [sticky, date], order: [DESC, DESC] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          ...WordPressPostData
        }
      }
    }
    site {
      siteMetadata {
        siteTitle
        siteDescription
        coverUrl
        siteUrl
      }
    }
  }
`;
