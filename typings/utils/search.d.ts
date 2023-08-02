export interface SearchResult {
  /**
   * The pagination data for the search.
   */
  Pagination: {
    Page: number;
    PageNext: number | null;
    PagePrev: number | null;
    PageTotal: number;
    Results: number;
    ResultsPerPage: number;
    ResultsTotal: number;
  };

  /**
   * The results obtained from the search.
   */
  Results: unknown[];
}

interface SearchParams {
  /**
   * The name to search for, you can use `+` for spaces or let the API handle it for you.
   */
  name?: string;

  /**
   * The server to search against, this is case sensitive.
   * @see https://xivapi.com/servers
   */
  server?: string;

  /**
   * Search or move to a specific page.
   */
  page?: number;
}
