export interface Node {
  bio?: any;
  slug: string;
  url: string;
  profile_image: string;
  name: string;
}

export interface Edge {
  node: Node;
}

export interface AllGhostAuthor {
  edges: Edge[];
}

export interface Data {
  allGhostAuthor: AllGhostAuthor;
}

export interface AllGHostAuthorsData {
  data: Data;
}
