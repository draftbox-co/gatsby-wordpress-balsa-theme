const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

module.exports = async function sourceNodes({
  actions,
  getNodesByType,
  store,
  cache,
  createNodeId,
  createContentDigest,
  getCache,
  reporter,
}) {
  const { createNode } = actions;

  const wordPressTagExists = getNodesByType("wordpress__TAG");

  console.log(wordPressTagExists, "tags exists check");

  if (!wordPressTagExists || wordPressTagExists.length === 0) {
    const entity = {
      wordpress_id: 6,
      count: 0,
      description: "Two tag",
      link: "https://withssl.theasdfghjkl.com/tag/one-tag/",
      name: "Two Tag",
      slug: "two-tag",
      meta: [],
      _links: {
        self: [
          {
            href: "https://withssl.theasdfghjkl.com/wp-json/wp/v2/tags/5",
          },
        ],
        collection: [
          {
            href: "https://withssl.theasdfghjkl.com/wp-json/wp/v2/tags",
          },
        ],
        about: [
          {
            href:
              "https://withssl.theasdfghjkl.com/wp-json/wp/v2/taxonomies/post_tag",
          },
        ],
        wp_post_type: [
          {
            href: "https://withssl.theasdfghjkl.com/wp-json/wp/v2/posts?tags=5",
          },
        ],
        curies: [
          {
            name: "wp",
            href: "https://api.w.org/{rel}",
            templated: true,
          },
        ],
      },
      id: "a7912d3d-9097-51d2-9603-11870469e9fc",
      taxonomy___NODE: "7704429c-eefa-5652-a586-5ed2e2b93d0e",
      path: "/tag/one-tag/",
    };

    let node = {
      ...entity,
      children: [],
      parent: null,
      internal: {
        type: "wordpress__TAG",
        contentDigest: createContentDigest(entity),
      },
    };
    createNode(node);
  }

  const mediaExists = getNodesByType("wordpress__wp_media");

  console.log(mediaExists, "media exists check");

  if (!mediaExists || mediaExists.length === 0) {
    const entity = {
      wordpress_id: 16,
      date: "2020-05-19T06:09:14.000Z",
      guid:
        "http://withssl.theasdfghjkl.com/wp-content/uploads/2020/05/code-export-for-devs.png",
      modified: "2020-05-19T06:09:14.000Z",
      slug: "code-export-for-devs",
      status: "inherit",
      type: "attachment",
      link: "https://withssl.theasdfghjkl.com/code-export-for-devs/",
      title: "code-export-for-devs",
      comment_status: "open",
      ping_status: "closed",
      template: "",
      meta: [],
      description:
        '<p class="attachment"><a href=\'https://withssl.theasdfghjkl.com/wp-content/uploads/2020/05/code-export-for-devs.png\'><img width="300" height="228" src="https://withssl.theasdfghjkl.com/wp-content/uploads/2020/05/code-export-for-devs-300x228.png" class="attachment-medium size-medium" alt="" srcset="https://withssl.theasdfghjkl.com/wp-content/uploads/2020/05/code-export-for-devs-300x228.png 300w, https://withssl.theasdfghjkl.com/wp-content/uploads/2020/05/code-export-for-devs-1024x777.png 1024w, https://withssl.theasdfghjkl.com/wp-content/uploads/2020/05/code-export-for-devs-768x583.png 768w, https://withssl.theasdfghjkl.com/wp-content/uploads/2020/05/code-export-for-devs.png 1127w" sizes="(max-width: 300px) 100vw, 300px" /></a></p>\n',
      caption: "",
      alt_text: "",
      media_type: "image",
      mime_type: "image/png",
      media_details: {
        width: 1127,
        height: 855,
        file: "2020/05/code-export-for-devs.png",
        image_meta: {
          aperture: "0",
          credit: "",
          camera: "",
          caption: "",
          created_timestamp: "0",
          copyright: "",
          focal_length: "0",
          iso: "0",
          shutter_speed: "0",
          title: "",
          orientation: "0",
          keywords: [],
        },
      },
      post: null,
      source_url:
        "https://draftbox-dev.s3.amazonaws.com/assets/wordpress-balsa.png",
      _links: {
        self: [
          {
            href: "https://withssl.theasdfghjkl.com/wp-json/wp/v2/media/16",
          },
        ],
        collection: [
          {
            href: "https://withssl.theasdfghjkl.com/wp-json/wp/v2/media",
          },
        ],
        about: [
          {
            href:
              "https://withssl.theasdfghjkl.com/wp-json/wp/v2/types/attachment",
          },
        ],
        author: [
          {
            embeddable: true,
            href: "https://withssl.theasdfghjkl.com/wp-json/wp/v2/users/1",
          },
        ],
        replies: [
          {
            embeddable: true,
            href:
              "https://withssl.theasdfghjkl.com/wp-json/wp/v2/comments?post=16",
          },
        ],
      },
      id: "7a4024e8-fa2a-5a17-be3e-8fccddfedc0d",
      author___NODE: "f47193d0-1110-5dda-9c56-9be8f422c539",
      path: "/code-export-for-devs/",
    };

    const encodedSourceUrl = encodeURI(entity.source_url);
    const mediaDataCacheKey = `wordpress-media-${entity.wordpress_id}`;

    try {
      const fileNode = await createRemoteFileNode({
        url: encodedSourceUrl,
        store,
        cache,
        createNode,
        createNodeId,
        getCache,
        parentNodeId: entity.id,
        reporter,
      });

      if (fileNode) {
        fileNodeID = fileNode.id;
        await cache.set(mediaDataCacheKey, {
          fileNodeID,
          modified: entity.modified,
        });

        entity.localFile___NODE = fileNodeID;
      }

      let node = {
        ...entity,
        children: [],
        parent: null,
        internal: {
          type: "wordpress__wp_media",
          contentDigest: createContentDigest(entity),
        },
      };

      createNode(node);
    } catch (e) {
      console.log(e, "error creating remote nodeF");
      // Ignore
    }
  }
};
