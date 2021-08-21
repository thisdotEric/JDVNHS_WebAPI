import knex from 'knex';
import config from './knexfile';
import IDatabase from '../IDatabase';

class KnexQueryBuilder implements IDatabase<knex> {
    private readonly db: knex;

    constructor() {
        this.db = knex(config[`${process.env.NODE_ENV}`]);
    }

    public getDbInstance(): knex {
        return this.db;
    }
}

export default KnexQueryBuilder;
