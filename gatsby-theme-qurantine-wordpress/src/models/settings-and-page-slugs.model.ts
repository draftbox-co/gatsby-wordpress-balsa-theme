interface Navigation {
  label: string;
  url: string;
}

export interface SettingsAndSlugs {
  ghostSettings: {
    title: string;
    navigation: Navigation[];
  };
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
}
