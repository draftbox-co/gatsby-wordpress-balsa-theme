interface Tag {
  name: string;
  slug: string;
}
export interface PostDescription {
  title: string;
  readingTime: string
  content: string;
  excerpt: string;
  plainExcerpt: string;
  slug: string;
  categories: {
    name: string;
    slug: string;
  };
  featured_media: {
    localFile: {
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
}
