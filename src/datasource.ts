import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'hollow_db_c',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'hollow_db',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  synchronize: true,
};

export default new DataSource({
  ...connectionOptions,
});
