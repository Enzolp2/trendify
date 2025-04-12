import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']) || 5432,
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  entities: [`${__dirname}/../modules/**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/**/*{.ts,.js}`],
  migrationsTableName: '_migrations',
  logging: true,
});
