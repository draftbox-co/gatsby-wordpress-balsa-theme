import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import "../styles/richtext.css";
import { PageDetails } from "../models/page-description.model";
import CtaMini from "../components/CtaMini";

type IndexPageProps = {
  data: {
    wordpressPage: PageDetails;
  };
  location: any;
};

const PageTemplate: React.FC<IndexPageProps> = ({ data, location }) => {
  const { wordpressPage } = data;
  return (
    <Layout>
      <div className="spacer my-6"></div>
      <div
        dangerouslySetInnerHTML={{ __html: wordpressPage.content }}
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
    wordpressPage(slug: { eq: $slug }) {
      ...WordpressPageData
    }
  }
`;
