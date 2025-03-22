import type { RedisClientType, RedisModules } from 'redis';
import type { ILogger, IConnectionManager } from '../utils';

export class RedisConnectionManager<T extends RedisModules> implements IConnectionManager {
  constructor (
    readonly client: RedisClientType<T>,
    private logger: ILogger
  ) {}

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.info('connect', 'connected to redis');
    } catch (err) {
      this.logger.error('connect', err);
      this.logger.info('connect', 'failed to connect to redis');
      if (process.env.NODE_ENV === 'production') {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await this.connect();
      }
      return process.exit(1);
    }
  }

  async ping(): Promise<void> {
    try {
      await this.client.ping();
    } catch (err) {
      this.logger.error('connect', err);
      this.logger.info('connect', 'failed to ping redis');
      if (process.env.NODE_ENV === 'production') {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await this.close();
        await this.connect();
        await this.ping();
      }
      return process.exit(1);
    }
  }

  async close(): Promise<void> {
    await this.client.quit();
  }
}