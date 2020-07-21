import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { graphql, Link, navigate } from "gatsby";
import CtaMini from "../components/CtaMini";
import Img from "gatsby-image";
import Disqus from "../components/disqus";
import FbComments from "../components/fb-comments";
import "../styles/richtext.css";
import { PostDescription } from "../models/all-post-description.model";
import ArticleMeta from "../components/meta/article-meta";
import facebookShare from "../images/facebook-share.svg";
import twitterShare from "../images/twitter-share.svg";
import linkedInShare from "../images/linkedin-share.svg";
import mailShare from "../images/mail.svg";
import CopyLink from "../components/copy-link";
import NextPrevPost from './../components/NextPrevPost';
import { InView } from "react-intersection-observer";

type PostTemplateProps = {
  data: {
    wordpressPost: PostDescription;
    prevPost: PostDescription;
    nextPost: PostDescription;
  };
  location: any;
};

const PostTemplate: React.FC<PostTemplateProps> = ({ data, location }) => {
  const { wordpressPost, prevPost, nextPost } = data;
  
  const [href, sethref] = useState("");
  const [showComments, setshowComments] = useState(false);

  const handleCommentsVisibility = (inView) => {
    if (inView && !showComments) {
      setshowComments(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sethref(window.location.href);
    }
  }, []);
  const twitterShareUrl = `https://twitter.com/share?text=${wordpressPost.plainTitle}&url=${href}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${href}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${href}&title=${wordpressPost.plainTitle}`;

  const mailShareUrl = `mailto:?subject=${wordpressPost.plainTitle}&body=${href}`;

  const handleNavigation = (e: any, slug) => {
    e.stopPropagation();
    navigate(slug);
  };

  return (
    <Layout>
      <ArticleMeta data={wordpressPost} amp={false} location={location} />
      <div className="spacer my-6"></div>
      <section className="px-4 max-w-4xl mx-auto">
        <h1
          className=" text-5xl text-center font-heading font-medium break-words"
          dangerouslySetInnerHTML={{ __html: wordpressPost.title }}
        ></h1>
        <p className="text-center mt-3">
          <span>{wordpressPost.date}</span><strong className="mx-2">&bull;</strong>
          <Link
            className="text-blue-700 hover:underline"
            to={`/author/${wordpressPost.author.slug}`}
          >
            {wordpressPost.author.name}
          </Link>
        </p>
      </section>
      <div className="spacer my-6"></div>
      {wordpressPost.featured_media?.localFile?.childImageSharp?.fluid && (
        <section className="px-4 container mx-auto">
          <Img
            style={{ maxHeight: "60vh", maxWidth: "100%" }}
            fluid={wordpressPost.featured_media.localFile.childImageSharp.fluid}
            alt=""
          />
        </section>
      )}
      {!wordpressPost.featured_media?.localFile?.childImageSharp?.fluid &&
        wordpressPost.featured_media?.localFile?.publicURL && (
          <section className="px-4 container mx-auto">
            <img
              className="mx-auto"
              style={{ maxHeight: "60vh", maxWidth: "100%" }}
              src={wordpressPost.featured_media.localFile.publicURL}
              alt=""
            />
          </section>
        )}

      <div className="spacer my-6"></div>
      <div
        dangerouslySetInnerHTML={{ __html: wordpressPost.content }}
        className="richtext max-w-3xl px-4 mx-auto font-serif text-gray-800"
      ></div>

      {wordpressPost.tags && wordpressPost.tags.length > 0 && (
        <div className="flex items-center max-w-3xl mt-8 lg:mx-auto flex-wrap px-4">
          {wordpressPost.tags.map((tag, index) => {
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
      <NextPrevPost prevPost={prevPost} nextPost={nextPost} />
      <InView
        as="div"
        onChange={(inView) => handleCommentsVisibility(inView)}
      ></InView>
      <div>
        {process.env.GATSBY_DISQUS_SHORTNAME && showComments && (
          <>
            <section className="max-w-4xl container mx-auto px-4 mt-16">
              <Disqus slug={wordpressPost.slug} title={wordpressPost.title} />
            </section>
          </>
        )}
        {process.env.GATSBY_FB_APP_ID && showComments && (
          <>          
            <section className="max-w-4xl container mx-auto px-4 mt-16">
              <FbComments href={href} />
            </section>
          </>
        )}
      </div>  
      <div className="spacer my-8"></div>
      <CtaMini />
    </Layout>
  );
};

export const postDataQuery = graphql`
  query($slug: String!, $prev: String, $next: String) {
    wordpressPost(permaLinkSlug: { eq: $slug }) {
      ...WordPressPostData
    }
    prevPost: wordpressPost(id: { eq: $prev }) {
      ...WordPressPostData
    }
    nextPost: wordpressPost(id: { eq: $next }) {
      ...WordPressPostData
    }
  }
`;

export default PostTemplate;
