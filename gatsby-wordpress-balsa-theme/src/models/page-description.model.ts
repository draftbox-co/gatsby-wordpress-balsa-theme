import { Tag } from './post-description.model';
export interface PageDetails {
  title: string;
  readingTime: string;
  content: string;
  excerpt: string;
  plainExcerpt: string;
  plainTitle: string;
  slug: string;
  categories: {
    name: string;
    slug: string;
  };
  featured_media: {
    localFile: {
      publicURL;
      childImageSharp: {
        fluid: any;
      };
    };
  };
  author: {
    name: string;
    slug: string;
  };
  tags: Tag[];
  date: string;
  sticky: boolean;
  modified: string;
}
