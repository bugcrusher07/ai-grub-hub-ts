export interface ResponseObject {
  success: boolean;
  content: string;
  error?: string;
}

export interface BaseToolParams {
  [key: string]: any;
}