export class Pagination {
  page: number;
  limit: number;
}

export class MetaResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}
