import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { graphql, navigate, Link } from "gatsby";
import "../styles/richtext.css";
import { PageDetails } from "../models/page-description.model";
import CtaMini from "../components/CtaMini";
import WebsiteMeta from "../components/meta/website-meta";
import ArticleMeta from "../components/meta/article-meta";
import Img from "gatsby-image";
import facebookShare from "../images/facebook-share.svg";
import twitterShare from "../images/twitter-share.svg";
import linkedInShare from "../images/linkedin-share.svg";
import pintrestShare from "../images/pinterest-share.svg";
import whatsappShare from "../images/whatsapp-share.svg";
import mailShare from "../images/mail.svg";
import CopyLink from "../components/copy-link";

type IndexPageProps = {
  data: {
    wordpressPage: PageDetails;
  };
  location: any;
};

const PageTemplate: React.FC<IndexPageProps> = ({ data, location }) => {
  const { wordpressPage } = data;

  const [href, sethref] = useState("");

  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      sethref(window.location.href);
      setOrigin(window.location.origin);
    }
  }, []);

  const twitterShareUrl = `https://twitter.com/share?text=${wordpressPage.plainTitle}&url=${href}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${href}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${href}&title=${wordpressPage.plainTitle}`;

  const mailShareUrl = `mailto:?subject=${wordpressPage.plainTitle}&body=${href}`;

  let pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${href}&description=${wordpressPage.title}`;
  if (
    wordpressPage.featured_media.localFile &&
    wordpressPage.featured_media.localFile.publicURL
  ) {
    pinterestShareUrl += `&media=${
      origin + wordpressPage.featured_media.localFile.publicURL
    }`;
  }

  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(
    wordpressPage.title + "\n" + href
  )}`;

  const handleNavigation = (e: any, slug) => {
    e.stopPropagation();
    navigate(slug);
  };
  return (
    <Layout>
      <ArticleMeta data={wordpressPage} amp={false} location={location} />
      <div className="spacer my-8 lg:my-12"></div>
      <section className="px-4 max-w-3xl mx-auto">
        <h1
          className="text-4xl lg:text-5xl font-sansSemibold break-words leading-tight"
          dangerouslySetInnerHTML={{ __html: wordpressPage.title }}
        ></h1>
        <p className="text-gray-600 break-words my-2 text-sm lg:text-base px-1">
          <span>{wordpressPage.date}</span>
          <span className="mx-2">•</span>
          <Link
            className="no-underline hover:underline cursor-pointer"
            to={`/author/${wordpressPage.author.slug}`}
          >
            {wordpressPage.author.name}
          </Link>
        </p>
      </section>
      <div className="spacer my-8 lg:my-12"></div>
      {wordpressPage.featured_media?.localFile?.childImageSharp?.fluid && (
        <section className="px-4 container mx-auto max-w-4xl">
          <Img
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            fluid={wordpressPage.featured_media.localFile.childImageSharp.fluid}
            alt=""
          />
        </section>
      )}
      {!wordpressPage.featured_media?.localFile?.childImageSharp?.fluid &&
        wordpressPage.featured_media?.localFile?.publicURL && (
          <section className="px-4 container mx-auto max-w-4xl">
            <img
              className="mx-auto"
              style={{ maxHeight: "100%" }}
              src={wordpressPage.featured_media.localFile.publicURL}
              alt=""
            />
          </section>
        )}

      <div className="spacer my-8 lg:my-12"></div>
      <div
        dangerouslySetInnerHTML={{ __html: wordpressPage.content }}
        className="richtext max-w-3xl px-4 mx-auto font-serifNormal text-gray-800"
      ></div>

      {wordpressPage.tags && wordpressPage.tags.length > 0 && (
        <div className="flex items-center max-w-3xl mt-8 lg:mx-auto flex-wrap px-4">
          {wordpressPage.tags.map((tag, index) => {
            return (
              <div
                onClick={(e) => handleNavigation(e, `tag/${tag.slug}`)}
                className="px-3 py-1 rounded-full mr-3 text-gray-700 cursor-pointer hover:text-white hover:border-gray-700 hover:bg-gray-700 bg-gray-300 mb-4"
                key={index}
              >
                #{tag.name}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex items-center max-w-3xl mt-8 lg:mx-auto px-4">
        <span className="mr-2 text-lg text-gray-700">Share:</span>
        <div className="social-icons">
          <ul className="flex">
            <li>
              <a
                className="block p-2 bg-gray-700 hover:bg-primary rounded-full mr-2"
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={facebookShare} alt="Facebook Share" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-gray-700 hover:bg-primary rounded-full mr-2"
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={twitterShare} alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-gray-700 hover:bg-primary rounded-full mr-2"
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={linkedInShare} alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-gray-700 hover:bg-primary rounded-full mr-2"
                href={pinterestShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={pintrestShare} alt="LinkedIn Share" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-gray-700 hover:bg-primary rounded-full mr-2"
                href={whatsAppShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4" src={whatsappShare} alt="LinkedIn Share" />
              </a>
            </li>
            <li>
              <a
                className="block p-2 bg-gray-700 hover:bg-primary rounded-full mr-2"
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

      <div className="spacer my-12"></div>
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
