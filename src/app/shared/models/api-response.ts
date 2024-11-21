export interface ApiResponse<T> {
  total: number;
  limit: number;
  offset: number;
  data: T[];
  statusCode: number;
  message: string;
}
