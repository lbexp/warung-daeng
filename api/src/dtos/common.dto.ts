export class PaginationRequest {
  page: string;
  limit: string;
  search: string;
}

export class MetaResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}
