import { DataSource } from 'typeorm';
import { AppDataSource } from './config/data-source';

let databaseConnection: DataSource;

async function getDatabaseConnection() {
  if (databaseConnection) {
    return databaseConnection;
  }

  return (databaseConnection = await AppDataSource.initialize());
}

getDatabaseConnection();

export { getDatabaseConnection };
