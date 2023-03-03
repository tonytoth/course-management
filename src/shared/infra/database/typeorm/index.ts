import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Database initialized');
  })
  .catch((error) => console.log(error));
