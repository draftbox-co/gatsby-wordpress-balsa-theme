export interface PrimaryAuthor {
  name: string;
  slug: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface GhostPostDescription {
  title: string;
  excerpt: string;
  updated_at: string;
  primary_author: PrimaryAuthor;
  tags: Tag[];
  reading_time: number;
  feature_image: any;
  localFeatureImage: {
    childImageSharp: {
      fluid: any;
    };
  };
  slug: string;
}

export interface Edge {
  __typename: string;
  node: GhostPostDescription;
}

export interface AllGhostPostDescription {
  edges: Edge[];
}
