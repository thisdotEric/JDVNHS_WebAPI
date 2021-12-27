import Knex from 'knex';
import config from './knexfile';
import IDatabase from '../IDatabase';
import { injectable } from 'inversify';

@injectable()
class KnexQueryBuilder implements IDatabase<Knex> {
  private readonly db: Knex;

  constructor() {
    this.db = Knex(config[`${process.env.NODE_ENV}`]);
  }

  public getDbInstance(): Knex {
    return this.db;
  }
}

export default KnexQueryBuilder;
