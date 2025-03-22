import type { ITransactionHandler, SafeyAny } from './index';


export interface IRepo {
  transactionHandler: ITransactionHandler;
}

/**
 * Shared inmem repo methods
 */
export interface IInmemRepoBase {
  removeAll(): Promise<void>;
  connect(): Promise<void>;
  ping(): Promise<void>;
  close(): Promise<void>;
}

/**
 * Gets T to store, returns simple version TS, usually with cut id
 */
export interface IInmemRepo<T, TS> extends IInmemRepoBase {
  getMany(...filterArgs: Array<SafeyAny>): Promise<TS[]>;
  storeMany(ds: T[], ...args: Array<SafeyAny>): Promise<void>;
  remove(identifier: string | number, ...args: Array<SafeyAny>): Promise<void>;
}