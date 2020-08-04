import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";

type SeoData = {
  wpSiteMetaData: {
    name: string;
    description: string;
  };
  site: {
    siteMetadata: {
      siteUrl: string;
      siteTitle: string;
      siteDescription: string;
      metadata: {
        title: string;
        description: string;
      };
      twitterCard: {
        title: string;
        description: string;
        imageUrl: string;
        username: string;
      };
      facebookCard: {
        title: string;
        description: string;
        imageUrl: string;
        appId: string;
      };
      language: string;
      logoUrl: string;
      iconUrl: string;
      coverUrl: string;
      alternateLogoUrl: string;
      shareImageHeight: string;
      shareImageWidth: string;
    };
  };
};

const ContactMeta = ({ location }) => {
  const data = useStaticQuery<SeoData>(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          siteTitle
          metadata {
            title
            description
          }
          twitterCard {
            title
            description
            imageUrl
            username
          }
          facebookCard {
            title
            description
            imageUrl
            appId
          }
          siteDescription
          language
          logoUrl
          iconUrl
          coverUrl
          alternateLogoUrl
          shareImageWidth
          shareImageHeight
          language
        }
      }
    }
  `);

  const config = data.site.siteMetadata;

  const baseUrl = data.site.siteMetadata.siteUrl;
  const siteTitle = data.site.siteMetadata.siteTitle;
  const siteDescription = data.site.siteMetadata.siteDescription;

  const canonical = url.resolve(baseUrl, location.pathname);

  const description = config.metadata.description || config.siteDescription;

  const publisherLogo =
    config.logoUrl || config.alternateLogoUrl
      ? url.resolve(config.siteUrl, config.logoUrl || config.alternateLogoUrl)
      : null;
  let shareImage =
    config.coverUrl ||
    config.facebookCard.imageUrl ||
    config.twitterCard.imageUrl;

  shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null;

  const facebookImageUrl = config.facebookCard.imageUrl
    ? url.resolve(config.siteUrl, config.facebookCard.imageUrl)
    : null;

  const twitterImageUrl = config.twitterCard.imageUrl
    ? url.resolve(config.siteUrl, config.twitterCard.imageUrl)
    : null;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": "WebPage",
    url: canonical,
    headline: 'Contact | ' + config.metadata.title || config.siteTitle,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight,
        }
      : undefined,
    publisher: {
      "@type": `Organization`,
      name: siteTitle,
      logo: publisherLogo
        ? {
            "@type": `ImageObject`,
            url: publisherLogo,
            width: 60,
            height: 60,
          }
        : undefined,
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl,
    },
    description,
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: config.language }}>
        <title>Contact | {config.metadata.title || config.siteTitle}</title>
        <meta
          name="description"
          content={config.metadata.description || config.siteDescription}
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={ 'Contact | ' +
            config.facebookCard.title ||
            config.metadata.title ||
            config.siteTitle
          }
        />
        <meta
          property="og:description"
          content={
            config.facebookCard.description ||
            config.metadata.description ||
            config.siteDescription
          }
        />
        <meta property="og:url" content={canonical} />
        {config.facebookCard.imageUrl !== "" && (
          <meta property="og:image" content={facebookImageUrl} />
        )}
        {config.facebookCard.appId !== "" && (
          <meta property="fb:app_id" content={config.facebookCard.appId} />
        )}
        <meta
          name="twitter:title"
          content={ 'Contact | ' + 
            config.twitterCard.title ||
            config.metadata.title ||
            config.siteTitle
          }
        />
        <meta
          name="twitter:description"
          content={
            config.twitterCard.description ||
            config.metadata.description ||
            config.siteDescription
          }
        />
        <meta name="twitter:url" content={canonical} />
        {config.twitterCard.username && (
          <meta name="twitter:site" content={config.twitterCard.username} />
        )}
        {config.twitterCard.username && (
          <meta name="twitter:creator" content={config.twitterCard.username} />
        )}
        {config.twitterCard.imageUrl && (
          <meta name="twitter:image" content={twitterImageUrl} />
        )}

        {config.twitterCard.imageUrl && (
          <meta name="twitter:card" content="summary_large_image" />
        )}

        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
    </>
  );
};

export default ContactMeta;
