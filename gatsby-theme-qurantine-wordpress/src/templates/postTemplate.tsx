import React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import CtaMini from "../components/CtaMini";
import Img from "gatsby-image";
import Disqus from "../components/disqus";
import "../styles/richtext.css";
import { PostDescription } from "../models/all-post-description.model";

type PostTemplateProps = {
  data: {
    wordpressPost: PostDescription;
  };
  location: any;
};

const PostTemplate: React.FC<PostTemplateProps> = ({ data, location }) => {
  const { wordpressPost } = data;

  return (
    <Layout>
      <div className="spacer my-6"></div>
      <section className="px-4 max-w-4xl mx-auto">
        <h1 className=" text-4xl text-center font-heading font-semibold">
          {wordpressPost.title}
        </h1>
        <p className="text-center">
          <span>{wordpressPost.date}, by </span>
          <Link
            className="ml-1 text-blue-700 hover:underline"
            to={`/author/${wordpressPost.author.slug}`}
          >
            {wordpressPost.author.name}
          </Link>
        </p>
      </section>
      <div className="spacer my-6"></div>
      {wordpressPost.featured_media && (
        <section className="px-4 container mx-auto">
          <Img
            style={{ maxHeight: "60vh" }}
            fluid={wordpressPost.featured_media.localFile.childImageSharp.fluid}
            alt=""
          />
        </section>
      )}
      <div className="spacer my-6"></div>
      <div
        dangerouslySetInnerHTML={{ __html: wordpressPost.content }}
        className="richtext max-w-3xl mx-4 lg:mx-auto font-serif text-gray-800"
      ></div>
      <hr className="spacer my-8 container mx-auto" />
      <section className="max-w-3xl container mx-auto">
        <Disqus slug={wordpressPost.slug} title={wordpressPost.title} />
      </section>
      <div className="spacer my-8"></div>
      <CtaMini />
    </Layout>
  );
};

export const postDataQuery = graphql`
  query($slug: String!) {
    wordpressPost(slug: { eq: $slug }) {
      ...WordPressPostData
    }
  }
`;

export default PostTemplate;
