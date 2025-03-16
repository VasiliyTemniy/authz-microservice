import type { ILogger } from "../../../utils";
import type { IHTTPServer, THTTPServerGenericRouteOptions, THTTPServerListenOptions, THTTPServerRouteHandler, THTTPServerRouteOptions } from "../interfaces/IHTTPServer";
import Fastify, { type FastifyInstance } from 'fastify';

export class HTTPServerFastify implements IHTTPServer {
  private fastify: FastifyInstance;

  constructor(private logger: ILogger) {
    this.fastify = Fastify();
  }

  async listen({ port, host, path }: THTTPServerListenOptions): Promise<void> {
    try {
      await this.fastify.listen({ port, host, path });
      this.logger.info('listen', 'server listening on', this.fastify.server.address());
    } catch (err) {
      this.logger.error('listen', err);
      process.exit(1);
    }
  }

  route(options: THTTPServerGenericRouteOptions, handler: THTTPServerRouteHandler): void {
    this.fastify.route({ method: options.method, url: options.path, handler });
  }

  get(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void {
    this.fastify.get(options.path, handler);
  }

  post(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void {
    this.fastify.post(options.path, handler);
  }

  put(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void {
    this.fastify.put(options.path, handler);
  }

  patch(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void {
    this.fastify.patch(options.path, handler);
  }

  delete(options: THTTPServerRouteOptions, handler: THTTPServerRouteHandler): void {
    this.fastify.delete(options.path, handler);
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  async close(): Promise<void> {
    try {
      await this.fastify.close();
      this.logger.info('close', 'server closed');
    } catch (err) {
      this.logger.error('close', err);
      process.exit(1);
    }
  }
}