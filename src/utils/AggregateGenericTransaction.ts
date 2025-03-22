import type { IRepo } from './IRepo';
import type { IGenericTransaction, ITransactionHandler } from './ITransactionHandler';

export interface IAggregateGenericTransaction extends IGenericTransaction {
  getTransactionByRepo(repo: IRepo): IGenericTransaction | undefined;
}

/**
 * Class used to aggregate multiple transactions
 * 
 * Gets a repository list as an argument, creates a transaction for each transaction handler
 * 
 * For example -
 * -- 5 repositories,
 * --- 3 of which use Postgres
 * ---- 2 of which use TransactionHandlerA
 * ---- 1 of which use TransactionHandlerB
 * --- 2 of which use MongoDB
 * ---- 2 of which use TransactionHandlerC
 * 
 * Then, when start() is called, it will create a transaction for each transaction handler and add it to the map
 */
export class AggregateGenericTransaction implements IAggregateGenericTransaction {
  transactionMap = new Map<ITransactionHandler, IGenericTransaction>();

  constructor(private repoList: IRepo[]) {}

  async start(): Promise<void> {
    for (const repo of this.repoList) {
      let transaction = this.transactionMap.get(repo.transactionHandler);
      if (transaction) {
        continue;
      } 

      transaction = await repo.transactionHandler.start();
      this.transactionMap.set(repo.transactionHandler, transaction);
    }
  }

  async commit(): Promise<void> {
    for (const transaction of this.transactionMap.values()) {
      await transaction.commit();
    }
  }

  async rollback(): Promise<void> {
    for (const transaction of this.transactionMap.values()) {
      await transaction.rollback();
    }
  }

  getTransactionByRepo(repo: IRepo): IGenericTransaction | undefined {
    return this.transactionMap.get(repo.transactionHandler);
  }
}
