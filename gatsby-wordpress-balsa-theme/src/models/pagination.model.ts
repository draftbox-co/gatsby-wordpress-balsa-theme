export interface PaginationContext {
  pageNumber: number;
  humanPageNumber: number;
  skip: number;
  limit: number;
  numberOfPages: number;
  previousPagePath: string;
  nextPagePath: string;
}
