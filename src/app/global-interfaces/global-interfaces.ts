export interface BackendError {
  error_code: number;
  error_message: string;
  error_field?: string[];
}

export interface BackendResponse<T> {
  error?: BackendError;
  success?: T;
}


