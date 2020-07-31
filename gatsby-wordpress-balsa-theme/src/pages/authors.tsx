import React from "react";
import Layout from "../components/Layout";
import userAvatar from "../images/female_avatar.svg";
import { graphql, Link } from "gatsby";
import CtaMini from "../components/CtaMini";
import { AuthorDescription } from "../models/author-description.model";
import WebsiteMeta from "../components/meta/website-meta";

type AuthorsProps = {
  data: {
    allWordpressWpUsers: {
      edges: { node: AuthorDescription }[];
    };
  };
};

const Authors: React.FC<AuthorsProps> = ({ data }) => {
  const { allWordpressWpUsers } = data;

  return (
    <Layout>
      <WebsiteMeta />
      <div className="spacer my-6"></div>
      <h1 className="text-4xl font-sansBold text-center">Authors</h1>
      <div className="spacer my-6"></div>
      <section className="px-4 container mx-auto">
        <div className="flex flex-wrap justify-center -mx-4">
          {allWordpressWpUsers.edges.map(({ node }, i) => {
            return (
              <Link
                to={`/author/${node.slug}`}
                className="w-full lg:w-1/3 px-4 mb-8 cursor-pointer"
              >
                <div className="h-full rounded shadow-md flex flex-col justify-between">
                  <div className="text-center p-4">
                    <img
                      className="w-1/3 mx-auto mb-4 rounded-full"
                      src={
                        node.avatar_urls?.wordpress_96
                          ? node.avatar_urls.wordpress_96
                          : userAvatar
                      }
                      alt=""
                    />
                    <h3 className="text-xl font-sansNormal">{node.name}</h3>
                    {/* <span>Regional Manager</span> */}
                    {node.description && (
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        {node.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaMini />
    </Layout>
  );
};

export default Authors;

export const AuthorsQuery = graphql`
  query {
    allWordpressWpUsers {
      edges {
        node {
          name
          slug
          description
          avatar_urls {
            wordpress_96
          }
        }
      }
    }
  }
`;
