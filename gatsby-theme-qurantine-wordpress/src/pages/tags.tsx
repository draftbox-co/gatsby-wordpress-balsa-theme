import React from "react";
import Layout from "../components/Layout";
import randomColor from "randomcolor";
import CtaMini from "../components/CtaMini";
import { graphql, Link } from "gatsby";
import { AllTagsInfo } from "../models/all-tags-description.model";

type TagsProps = AllTagsInfo;

const Tags: React.FC<TagsProps> = ({ data }) => {
  const { allGhostTag } = data;
  return (
    <Layout>
      <div className="spacer my-6"></div>
      <h1 className="text-4xl font-bold text-center">
        {allGhostTag.edges.length > 0 ? "Tags" : "No tags available."}
      </h1>
      <div className="spacer my-6"></div>
      {allGhostTag.edges.length > 0 && (
        <section className="px-4 container mx-auto">
          <div className="flex flex-wrap justify-center -mx-4">
            {allGhostTag.edges.map(({ node }, i) => {
              return (
                <Link
                  key={i}
                  to={`tag/${node.slug}`}
                  className="w-full lg:w-1/3 px-4 mb-8 cursor-pointer"
                >
                  <div className="h-full overflow-hidden rounded shadow-md flex flex-col justify-between">
                    <div
                      className="h-32 flex justify-center items-center text-white text-6xl font-black"
                      style={{
                        backgroundColor: randomColor({ luminosity: "dark" }),
                      }}
                    >
                      {node.name[0]}
                    </div>
                    <div className="text-center p-4">
                      <h1 className="text-3xl font-heading capitalize">
                        {node.name}
                      </h1>
                      <span className="text-gray-600">
                        {node.postCount} {node.postCount > 1 ? "posts" : "post"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      <CtaMini />
    </Layout>
  );
};

export default Tags;

export const TagsQuery = graphql`
  query {
    allGhostTag {
      edges {
        node {
          name
          slug
          postCount
        }
      }
    }
  }
`;
