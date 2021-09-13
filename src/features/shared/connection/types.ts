export type ApiErrorType =
  | 'NO_CONNECTION'
  | 'INVALID_FIELD'
  | 'RESOURCE_NOT_FOUND'
  | 'SERVER_BUSY'
  | 'SERVICE_ERROR'
  | 'LOGIN_REQUIRED'
  | 'PREMISSION_REQUIRED'
  | 'NO_RESPONSE'
  | 'UNKNOWN';

export interface ResponseError {
  type: ApiErrorType;
  fieldErrors?: { [key: string]: object };
  entityId?: number;
}

export interface ApiResponse {
  success: boolean;
  code: number;
  data: any;
  message: string | null;
  errors?: ResponseError;
}
