import React from "react";
import { graphql, Link } from "gatsby";
import { PostDescription } from "../models/all-post-description.model";
import ArticleMeta from "../components/meta/article-meta";

type PostTemplate = {
  data: {
    wordpressPost: PostDescription;
  };
  location: any;
  pageContext: {
    title: string;
    amp: boolean;
  };
};

const PostTemplate: React.FC<PostTemplate> = ({
  data,
  location,
  pageContext,
}) => {
  const { wordpressPost } = data;
  return (
    <>
      <ArticleMeta data={wordpressPost} amp={pageContext.amp} location={location}/>
      <header className="main-header">
        <nav className="blog-title">
          <Link
            to="/"
            dangerouslySetInnerHTML={{ __html: data.wordpressPost.title }}
          ></Link>
        </nav>
      </header>
      <main className="content" role="main">
        <article className="post tag-getting-started">
          <header className="post-header">
            <h1
              className="post-title"
              dangerouslySetInnerHTML={{ __html: data.wordpressPost.title }}
            ></h1>
            <div className="post-meta">
              <div className="post-meta-avatars">
                <p className="author">{data.wordpressPost.author.name}</p>
              </div>
              <time
                className="post-date"
                dateTime="{{date format='DD-MM-YYYY'}}"
              >
                {data.wordpressPost.date}
              </time>{" "}
            </div>
          </header>
          {data.wordpressPost.featured_media?.localFile?.childImageSharp
            ?.fluid && (
            <figure className="post-image">
              <img
                src={
                  data.wordpressPost.featured_media.localFile.childImageSharp
                    .fluid.src
                }
                alt={data.wordpressPost.title}
              />
            </figure>
          )}
          <section
            className="post-content"
            dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
          ></section>

          {data.wordpressPost.tags && data.wordpressPost.tags.length > 0 && (
            <div className="tags">
              <span>Tag:</span>
              <a className="tag" href={`/tag/${data.wordpressPost.tags[0].slug}`}>
                {data.wordpressPost.tags[0].name}
              </a>
            </div>
          )}

          <div className="comment-button-container">
            <button>
              <a href={`${data.wordpressPost.slug}`}>Leave a comment</a>
            </button>
          </div>
        </article>
      </main>
    </>
  );
};
export default PostTemplate;

export const postDataQuery = graphql`
  query($slug: String!) {
    wordpressPost(permaLinkSlug: { eq: $slug }) {
      title
      content
      excerpt
      plainExcerpt
      plainTitle
      slug: permaLinkSlug
      categories {
        name
        slug
      }
      readingTime
      featured_media: featured_media_custom {
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2000, sizes: "90") {
              ...GatsbyImageSharpFluid
            }
          }
          seo: childImageSharp {
            fixed(width: 1200, quality: 100) {
              src
            }
          }
          
        }
      }
      author {
        name
        slug
        avatar_urls {
          wordpress_96
        }
        description
      }
      tags: tags_custom {
        name
        slug
      }
      date(formatString: "MMMM DD YYYY")
      modified(formatString: "MMMM DD YYYY")
      sticky
    }
  }
`;
