export interface GhostTagInfo {
  node: {
    name: string;
    slug: string;
    postCount: number;
  };
}

export interface AllGhostTag {
  edges: GhostTagInfo[];
}

export interface Data {
  allGhostTag: AllGhostTag;
}

export interface AllTagsInfo {
  data: Data;
}
