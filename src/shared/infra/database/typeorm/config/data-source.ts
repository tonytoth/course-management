import 'reflect-metadata';
import { DataSource } from 'typeorm';
import StudentEntity from '../entities/student.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_DATABASE_PORT || '3306', 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  migrationsRun: true,
  entities: [StudentEntity],
  migrations: [],
  subscribers: [],
});
