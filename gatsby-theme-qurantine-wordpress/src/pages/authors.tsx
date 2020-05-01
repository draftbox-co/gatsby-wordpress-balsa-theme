import React from "react";
import Layout from "../components/Layout";
import userAvatar from "../images/female_avatar.svg";
import { graphql, Link } from "gatsby";
import { AllGHostAuthorsData } from "../models/all-authors-description.model";
import CtaMini from "../components/CtaMini";

type AuthorsProps = AllGHostAuthorsData;

const Authors: React.FC<AuthorsProps> = ({ data }) => {
  const { allGhostAuthor } = data;

  return (
    <Layout>
      <div className="spacer my-6"></div>
      <h1 className="text-4xl font-bold text-center">Authors</h1>
      <div className="spacer my-6"></div>
      <section className="px-4 container mx-auto">
        <div className="flex flex-wrap justify-center -mx-4">
          {allGhostAuthor.edges.map(({ node }, i) => {
            return (
              <Link
                to={`/author/${node.slug}`}
                className="w-full lg:w-1/3 px-4 mb-8 cursor-pointer"
              >
                <div className="h-full rounded shadow-md flex flex-col justify-between">
                  <div className="text-center p-4">
                    <img
                      className="w-1/3 mx-auto mb-4 rounded-full"
                      src={userAvatar}
                      alt=""
                    />
                    <h3 className="text-xl font-heading">{node.name}</h3>
                    {/* <span>Regional Manager</span> */}
                    {node.bio && (
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        Started as a Sales representative at Stamford branch,
                        moved to Scranton. All of us left as soon as possible
                        except for Andy.
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
    allGhostAuthor {
      edges {
        node {
          bio
          slug
          url
          profile_image
          name
        }
      }
    }
  }
`;
