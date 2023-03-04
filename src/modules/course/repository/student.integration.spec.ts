import { StudentRepositoryFake } from './student.repository.fake';
import { getDatabaseConnection } from './../../../shared/infra/database/typeorm/';
import { TypeORMStudentRespository } from './student.repository.typeorm';
import { StudentRepository } from './student.repository';

describe('Student Repository Integration Testing', () => {
  let studentRepos: StudentRepository[];

  beforeAll(async () => {
    const connection = await getDatabaseConnection();
    console.log(connection);
    studentRepos = [
      new TypeORMStudentRespository(connection.manager),
      new StudentRepositoryFake(),
    ];
  });

  it('should be able to save student entity', () => {
    const student = {
      email: 'tony@toth.tony',
      firstName: 'Tony',
      lastName: 'Toth',
    };

    studentRepos.forEach(async (studentRepo) => {
        // @ts-ignore
      await studentRepo.save(student);

      const maybeFetchedStudent = await studentRepo.getByEmail(student.email);

      expect(maybeFetchedStudent).toMatchObject(student);
    });
  });
});
