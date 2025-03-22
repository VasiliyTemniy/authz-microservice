import type { IAPIResponse } from '../submodules/micro-std-response/ts';

export interface THTTPRequest {
  body: unknown;
  query: unknown;
  params: unknown;
}

export interface THTTPResponse {
  status: (code: number) => THTTPResponse;
  send: (data: IAPIResponse) => THTTPResponse;
}
