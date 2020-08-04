interface Navigation {
  label: string;
  url: string;
}

interface SocialLinks {
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
  pinterest: string;
  youtube: string;
  dribbble: string;
  behance: string;
  externalLink: string;
  whatsapp: string;
}

export interface SettingsAndSlugs {
  wpSiteMetaData: {
    name: string;
    description: string;
    language: string;
  };
  site: {
    siteMetadata: {
      siteUrl: string;
      apiUrl: string;
      header: {
        navigation: Navigation[];
      };
      footer: {
        copyright: string;
        navigation: Navigation[];
      };
      socialLinks: SocialLinks;
      subscribeWidget: {
        title: string;
        helpText: string;
        successMessage: string;
      };
      logoUrl: string;
      siteTitle: string;
      language: string;
    };
  };
}
