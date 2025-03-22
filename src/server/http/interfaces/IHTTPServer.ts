import type { THTTPRequest, THTTPResponse } from 'src/utils';

export interface THTTPServerListenOptions {
  port: number;
  host?: string;
  path?: string;
}

export interface THTTPServerRouteOptions {
  path: string;
}

export interface THTTPServerGenericRouteOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
}

export type THTTPServerRouteHandler = (req: THTTPRequest, res: THTTPResponse) => Promise<void>;

export interface IHTTPServer {
  listen(options: THTTPServerListenOptions): Promise<void>;
  route(options: THTTPServerGenericRouteOptions, handler: THTTPServerRouteHandler): void;
  get(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void;
  post(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void;
  put(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void;
  patch(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void;
  delete(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void;
  init(): Promise<void>;
  close(): Promise<void>;
}