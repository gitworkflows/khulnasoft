export interface KhulnasoftRequest {
  '@type': '@khulnasoft.com/core:Request';
  request: {
    url: string;
    query?: { [key: string]: string };
    headers?: { [key: string]: string };
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
  };
  options?: { [key: string]: any };
  bindings?: { [key: string]: string };
}
