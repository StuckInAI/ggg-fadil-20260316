import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Subscriber } from './entities/Subscriber';
import path from 'path';

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve('./data/newsletter.db');

let AppDataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (AppDataSource && AppDataSource.isInitialized) {
    return AppDataSource;
  }

  AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    entities: [Subscriber],
    synchronize: true,
    logging: false,
  });

  await AppDataSource.initialize();
  return AppDataSource;
}
