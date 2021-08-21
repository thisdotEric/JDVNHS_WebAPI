import { Container } from 'inversify';
import IDatabase from './../database/IDatabase';
import KnexQueryBuilder from './../database/knexQueryBuilder/knexDatabase';
import knex from 'knex';

const container = new Container();

container.bind<IDatabase<knex>>('IDatabase').to(KnexQueryBuilder);

export default container;
