import React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import { GhostPostDescription } from "../models/post-description.model";
import CtaMini from "../components/CtaMini";
import Img from "gatsby-image";
import { MetaData } from "../components/meta";
import Disqus from "../components/disqus";
import '../styles/richtext.css';

type PostTemplateProps = {
  data: GhostPostDescription;
  location: any;
};

const PostTemplate: React.FC<PostTemplateProps> = ({ data, location }) => {
  const { ghostPost } = data;

  return (
    <Layout>
      <MetaData data={data} location={location} />
      <div className="spacer my-6"></div>
      <section className="px-4 max-w-4xl mx-auto">
        <h1 className=" text-4xl text-center font-heading font-semibold">
          {ghostPost.title}
        </h1>
        <p className="text-center">
          <span>{ghostPost.updated_at}, by </span>
          <Link
            className="ml-1 text-blue-700 hover:underline"
            to={`/author/${ghostPost.primary_author.slug}`}
          >
            {ghostPost.primary_author.name}
          </Link>
        </p>
      </section>
      <div className="spacer my-6"></div>
      {ghostPost.localFeatureImage && (
        <section className="px-4 container mx-auto">
          <Img
            style={{ maxHeight: "60vh" }}
            fluid={ghostPost.localFeatureImage.childImageSharp.fluid}
            alt=""
          />
        </section>
      )}
      <div className="spacer my-6"></div>
      <div
        dangerouslySetInnerHTML={{ __html: ghostPost.childHtmlRehype.html }}
        className="richtext max-w-3xl mx-4 lg:mx-auto font-serif text-gray-800"
      ></div>
      <hr className="spacer my-8 container mx-auto" />
      <section className="max-w-3xl container mx-auto">
        <Disqus slug={ghostPost.slug} title={ghostPost.title} />
      </section>
      <div className="spacer my-8"></div>
      <CtaMini />
    </Layout>
  );
};

export const postDataQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostDetails
    }
  }
`;

export default PostTemplate;
