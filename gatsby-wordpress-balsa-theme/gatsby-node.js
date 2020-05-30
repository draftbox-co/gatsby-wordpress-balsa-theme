/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { paginate } = require(`gatsby-awesome-pagination`);
const htmlToText = require("html-to-text");
const readingTime = require("reading-time");
exports.sourceNodes = require("./fix-source-nodes");
const fetch = require('node-fetch');

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createFieldExtension, createTypes } = actions;

  createFieldExtension({
    name: "featured_media_custom",
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source.featured_media___NODE) {
            return context.nodeModel.getNodeById({
              id: source.featured_media___NODE,
              type: "wordpress__wp_media",
            });
          }
          return null;
        },
      };
    },
  });

  createFieldExtension({
    name: "tags_custom",
    extend() {
      return {
        resolve(sources, args, context, info) {
          if (sources.tags___NODE && sources.tags___NODE.length > 0) {
            return sources.tags___NODE.map((tagNode) =>
              context.nodeModel.getNodeById({
                id: tagNode,
                type: `wordpress__TAG`,
              })
            );
          }
          return [];
        },
      };
    },
  });

  createFieldExtension({
    name: "plainExcerpt",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          let plainExcerpt = htmlToText
            .fromString(source.excerpt, {
              wordWrap: 155,
              ignoreHref: true,
            })
            .slice(0, 156);

          if (plainExcerpt.length > 155) {
            plainExcerpt = plainExcerpt.slice(0, 152) + "...";
          }
          return plainExcerpt;
        },
      };
    },
  });

  createFieldExtension({
    name: "plainTitle",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          let plainTitle = htmlToText.fromString(source.title).slice(0, 156);
          return plainTitle;
        },
      };
    },
  });

  createFieldExtension({
    name: "readingTime",
    extend() {
      return {
        resolve(source) {
          const readingTimeValue = readingTime(source.content);
          return readingTimeValue.text;
        },
      };
    },
  });

  createTypes(`
    type wordpress__POST implements Node {
      plainExcerpt: String @plainExcerpt
      readingTime: String @readingTime
      plainTitle: String @plainTitle
      tags_custom: [wordpress__TAG] @tags_custom
      featured_media_custom: wordpress__wp_media @featured_media_custom
    }
  `);

  createTypes(`
    type wordpress__PAGE implements Node {
      plainExcerpt: String @plainExcerpt
      readingTime: String @readingTime
      plainTitle: String @plainTitle
      featured_media_custom: wordpress__wp_media @featured_media_custom
    }
  `);

  // createTypes(`
  // type wordpress__TAGConnection implements Node {

  // }
  // `);

  const typeDefs = `
  type WPSiteMetaData implements Node {
    siteDescription: String
    siteName: String,
    language: String
  }
`;
  createTypes(typeDefs);
};

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  console.log("createResolvers called");

  createResolvers({
    Query: {
      wpSiteMetaData: {
        type: `WPSiteMetaData`,
        async resolve(source, args, context, info) {
          let title = "";
          let description = "";
          let language = "auto";
          const metadata = context.nodeModel.getAllNodes({
            type: `wordpress__site_metadata`,
          });
          const wordPressSetting = context.nodeModel.getAllNodes({
            type: `wordpress__wp_settings`,
          });
          title = metadata[0].name
            ? metadata[0].name
            : wordPressSetting[0].title;
          description = metadata[0].description
            ? metadata[0].description
            : wordPressSetting[0].description;
          if (wordPressSetting && wordPressSetting.length > 0) {
            language = wordPressSetting[0].language;
          } else {
            try {
              const response = await fetch(metadata[0].url);
              const responseHTML = await response.text();
              const firstValue = responseHTML.match(/(?<=")(?:\\.|[^"\\])*(?=")/)[0];
              language = firstValue;
            } catch (error) {
              console.log('fetching html error');
              language = "auto";
            }
          }
          return {
            siteName: title,
            siteDescription: description,
            language: language,
          };
        },
      },
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const indexTemplate = require.resolve("./src/templates/indexTemplate.tsx");
  const postTemplate = require.resolve("./src/templates/postTemplate.tsx");
  const authorTemplate = require.resolve("./src/templates/authorTemplate.tsx");
  const tagsTemplate = require.resolve("./src/templates/tagTemplate.tsx");
  const pageTemplate = require.resolve("./src/templates/pageTemplate.tsx");
  const postAmpTemplate = require.resolve(
    "./src/templates/postTemplate.amp.tsx"
  );

  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allWordpressPost {
          edges {
            node {
              id
              slug
            }
          }
        }

        allWordpressTag(filter: { count: { gt: 0 } }) {
          edges {
            node {
              name
              slug
              count
            }
          }
        }

        allWordpressWpUsers {
          edges {
            node {
              name
              slug
            }
          }
        }

        allWordpressPage {
          edges {
            node {
              slug
            }
          }
        }

        site {
          siteMetadata {
            postsPerPage
          }
        }

        wpSiteMetaData {
          siteName
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // const postsPerPage = result.data.site.siteMetadata.postsPerPage;
  const postsPerPage = 9;
  const posts = result.data.allWordpressPost.edges;
  const authors = result.data.allWordpressWpUsers.edges;
  const tags = result.data.allWordpressTag.edges;
  const pages = result.data.allWordpressPage.edges;
  const siteTitle = result.data.wpSiteMetaData.siteName;

  posts.forEach((post, i, arr) => {
    createPage({
      path: `/${post.node.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.slug,
        next: i === arr.length - 1 ? null : arr[i + 1].node.id,
        prev: i !== 0 ? arr[i - 1].node.id : null,
      },
    });

    createPage({
      path: `/${post.node.slug}/amp`,
      component: postAmpTemplate,
      context: {
        slug: post.node.slug,
        amp: true,
        title: siteTitle,
      },
    });
  });

  authors.forEach(async ({ node }) => {
    const authorPosts = await graphql(`
    {
      allWordpressPost(filter: {author: {slug: {eq: "${node.slug}"}}}) {
        edges {
          node {
            id
          }
        }
    }
  }
    `);

    const authorPostCount = authorPosts.data.allWordpressPost.edges.length;

    const totalPosts = authorPostCount ? authorPostCount : 0;
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);

    // This part here defines, that our author pages will use
    // a `/author/:slug/` permalink.
    node.url = `/author/${node.slug}/`;

    console.log(numberOfPages, "number of pages");
    console.log(node.url, "number of pages");

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1;
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null;
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null;

      createPage({
        path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
        component: authorTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages: numberOfPages,
          humanPageNumber: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath,
        },
      });
    });
  });

  tags.forEach(({ node }, i) => {
    const totalPosts = node.count !== null ? node.count : 0;
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);
    node.url = `/tag/${node.slug}/`;

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1;
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null;
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null;

      createPage({
        path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
        component: tagsTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages: numberOfPages,
          humanPageNumber: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath,
        },
      });
    });
  });

  pages
    .filter((page) => !page.node.slug.startsWith("contact"))
    .forEach((page) => {
      createPage({
        path: `/${page.node.slug}`,
        component: pageTemplate,
        context: {
          slug: page.node.slug,
        },
      });
    });

  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`;
      } else {
        return `/page`;
      }
    },
  });
};
