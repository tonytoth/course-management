import { Result } from '../../domain/result';
import { Student } from '../../domain/student.entity';
import { MailService } from '../../mail.service';
import { StudentRepository } from '../../student.repository';

interface StudentInput {
  email: string;
  firstName: string;
  lastName: string;
}

class RegisterStudent {
  studentRepository: StudentRepository;
  mailService: MailService;

  constructor(studentRepository: StudentRepository, mailService: MailService) {
    this.studentRepository = studentRepository;
    this.mailService = mailService;
  }

  async execute(input: Partial<StudentInput>) {
    const studentResult = Student.create({
      email: input.email || '',
      firstName: input.firstName || '',
      lastName: input.lastName || '',
    });

    if (studentResult.hasErrors()) {
      return Result.isNotFine(studentResult.getFirstError());
    }

    const successfulStudent = Result.isFine<Student>(
      studentResult.getValue() as Student,
    );

    const studentAlreadyExists = await this.studentRepository.getByEmail(
      successfulStudent.getValue().email,
    );

    if (studentAlreadyExists) {
      return Result.isNotFine({
        message: 'Student already created',
        type: 'StudentAlreadyCreated',
      });
    }

    await this.studentRepository.save(successfulStudent.getValue());
    await this.mailService.sendEmail({});

    return Result.isFine(studentResult.getValue());
  }
}

export { RegisterStudent };
