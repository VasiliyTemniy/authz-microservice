import type { DataSource, QueryRunner } from 'typeorm';
import type { IGenericTransaction, ITransactionHandler } from './ITransactionHandler.js';

class TypeOrmTransaction implements IGenericTransaction {
  constructor(
    /** TypeOrm QueryRunner associated with the transaction */
    readonly queryRunner: QueryRunner
  ) {}

  async commit(): Promise<void> {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
  }

  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
  }
}

export class TransactionHandlerTypeOrmPG implements ITransactionHandler {

  constructor(
    private dataSource: DataSource
  ) {}

  async start(): Promise<TypeOrmTransaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    return new TypeOrmTransaction(queryRunner);
  }

  async commit(t: TypeOrmTransaction): Promise<void> {
    await t.commit();
  }

  async rollback(t: TypeOrmTransaction): Promise<void> {
    await t.rollback();
  }
  
}