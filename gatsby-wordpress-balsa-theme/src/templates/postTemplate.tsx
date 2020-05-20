import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import CtaMini from "../components/CtaMini";
import Img from "gatsby-image";
import Disqus from "../components/disqus";
import "../styles/richtext.css";
import { PostDescription } from "../models/all-post-description.model";
import ArticleMeta from "../components/meta/article-meta";
import facebookShare from "../images/facebook-share.svg";
import twitterShare from "../images/twitter-share.svg";
import linkedInShare from "../images/linkedin.svg";
import mailShare from "../images/mail.svg";
import CopyLink from "../components/copy-link";

type PostTemplateProps = {
  data: {
    wordpressPost: PostDescription;
  };
  location: any;
};

const PostTemplate: React.FC<PostTemplateProps> = ({ data, location }) => {
  const { wordpressPost } = data;
  const [href, sethref] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      sethref(window.location.href);
    }
  }, []);
  const twitterShareUrl = `https://twitter.com/share?text=${wordpressPost.plainTitle}&url=${href}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${href}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${href}&title=${wordpressPost.plainTitle}`;

  const mailShareUrl = `mailto:?subject=${wordpressPost.plainTitle}&body=${href}`;

  return (
    <Layout>
      <ArticleMeta data={wordpressPost} amp={false} />
      <div className="spacer my-6"></div>
      <section className="px-4 max-w-4xl mx-auto">
        <h1
          className=" text-4xl text-center font-heading font-semibo break-words"
          dangerouslySetInnerHTML={{ __html: wordpressPost.title }}
        ></h1>
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
            style={{ maxHeight: "60vh", maxWidth: "100%" }}
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
      <div className="flex items-center max-w-3xl mt-8 mx-4 lg:mx-auto">
        <span className="mr-2 text-lg text-gray-700">Share:</span>
        <div className="social-icons">
          <ul className="flex">
            <li>
              <a
                className="block p-2 bg-blue-500 hover:bg-blue-700 rounded-full mr-2"
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={facebookShare} alt="Facebook Share" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-blue-500 hover:bg-blue-700 rounded-full mr-2"
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={twitterShare} alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-blue-500 hover:bg-blue-700 rounded-full mr-2"
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={linkedInShare} alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-blue-500 hover:bg-blue-700 rounded-full mr-2"
                href={mailShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={mailShare} alt="Mail" />
              </a>
            </li>
            <li>
              <CopyLink textToCopy={href} />
            </li>
          </ul>
        </div>
      </div>
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
