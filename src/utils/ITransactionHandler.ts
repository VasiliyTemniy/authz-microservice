/**
 * Generic database transaction interface
 */
export interface IGenericTransaction {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

/**
 * Supplementary generic transaction handler interface used in db client layer implementations
 */
export interface ITransactionHandler {
  start(): Promise<IGenericTransaction>;
  commit(t: IGenericTransaction): Promise<void>;
  rollback(t: IGenericTransaction): Promise<void>;
}