export interface TagInfo {
  node: {
    name: string;
    slug: string;
    count: number;
  };
}

export interface AllTags {
  edges: TagInfo[];
}

export interface Data {
  allWordpressTag: AllTags;
}

export interface AllTagsInfo {
  data: Data;
}
