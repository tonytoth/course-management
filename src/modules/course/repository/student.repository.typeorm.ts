import { Repository } from 'typeorm';

import StudentEntity from 'shared/infra/database/typeorm/entities/student.entity';
import { StudentRepository } from './student.repository';
import { Student } from '../domain/student.entity';

export class TypeORMStudentRespository
  extends Repository<StudentEntity>
  implements StudentRepository
{
  async getByEmail(email: string) {
    const studentByEmail = await this.find({ where: { email } });

    if (studentByEmail.length > 0) {
      const domainStudentResult = Student.create({
        email: studentByEmail[0].email,
        firstName: studentByEmail[0].firstName,
        lastName: studentByEmail[0].lastName,
      });

      if (domainStudentResult.hasErrors()) {
        return undefined;
      }

      return domainStudentResult.getValue() as Student;
    }

    return undefined;
  }
}
