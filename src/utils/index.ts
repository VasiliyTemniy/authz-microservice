export * from './logger';
export * from './date';
export * from './ICRUD';
export * from './IRepo';
export * from './HTTP';
export * from './EntityMapper';
export * from './ITransactionHandler';
export * from './TransactionHandlerTypeOrmPG';

export type SafeyAny =
  { [key: string]: SafeyAny } |
  Array<SafeyAny> |
  string |
  number |
  null |
  undefined;

/**
 * Interface to expose private inmem repo methods from service
 */
export interface IHasInmemRepoService {
  flushInmem(): Promise<void>;
  connectInmem(): Promise<void>;
  pingInmem(): Promise<void>;
  closeInmem(): Promise<void>;
}

export interface IConnectionManager {
  connect(): Promise<void>;
  ping(): Promise<void>;
  close(): Promise<void>;
}