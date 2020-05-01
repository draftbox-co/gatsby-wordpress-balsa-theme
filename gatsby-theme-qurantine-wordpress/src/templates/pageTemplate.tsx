import React from "react";
import Layout from "../components/Layout";
import { MetaData } from "../components/meta";
import { graphql } from "gatsby";
import { GhostPage } from "../models/page-description.model";
import Img from "gatsby-image";
import CtaMini from "../components/CtaMini";
import '../styles/richtext.css';

type IndexPageProps = {
  data: {
    ghostPage: GhostPage;
  };
  location: any;
};

const PageTemplate: React.FC<IndexPageProps> = ({ data, location }) => {
  const { ghostPage } = data;
  return (
    <Layout>
      <MetaData data={data} location={location} />
      <div className="spacer my-6"></div>
      {ghostPage.localFeatureImage && (
        <section className="px-4 container mx-auto">
          <Img
            style={{ maxHeight: "60vh" }}
            fluid={ghostPage.localFeatureImage.childImageSharp.fluid}
            alt=""
          />
        </section>
      )}
      <div className="spacer my-6"></div>
      <div
        dangerouslySetInnerHTML={{ __html: ghostPage.childHtmlRehype.html }}
        className="richtext max-w-3xl mx-4 lg:mx-auto font-serif text-gray-800"
      ></div>
      <div className="spacer my-6"></div>
      <CtaMini />
    </Layout>
  );
};

export default PageTemplate;

export const PageTemplateQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageDetails
    }
  }
`;
