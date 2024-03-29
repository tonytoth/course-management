import path from 'path';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { Student } from '../../domain/student.entity';
import { Result } from '../../domain/result';
import { RegisterStudent } from './register-student';
import { EmailServiceSpy } from '../../fake/email.service.spy';
import { StudentRepositoryFake } from '../../repository/student.repository.fake';
import { StudentRepositoryBuilder } from '../../builder/student-repo.fake.builder';

const feature = loadFeature(path.join(__dirname, './register-student.feature'));

interface StudentInput {
  firstName: string;
  lastName: string;
  email: string;
}

defineFeature(feature, (test) => {
  test('Successfully register a student', ({ given, when, then }) => {
    let registerStudentUseCase: RegisterStudent;
    let response: unknown;
    let studentRepository: StudentRepositoryFake;
    let studentRepositorySpy: unknown;
    let emailService: EmailServiceSpy;

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();

      emailService = new EmailServiceSpy();

      studentRepositorySpy = jest.spyOn(studentRepository, 'save');

      registerStudentUseCase = new RegisterStudent(
        studentRepository,
        emailService,
      );
    });

    when('the student is trying to get registered', async () => {
      const studentInput: StudentInput = {
        email: 'tony@email.com',
        firstName: 'Tony',
        lastName: 'Toth',
      };

      response = await registerStudentUseCase.execute(studentInput);
    });

    then('the student should be successfully registered', () => {
      expect(emailService.getCalledTimes('sendEmail')).toBe(1);
      expect(emailService.getParametersFor('sendEmail')).toStrictEqual({
        from: {
          email: 'course@management.app',
          name: 'My Course Management',
        },
        to: {
          email: 'tony@email.com',
          name: 'Tony Toth',
        },
        subject: 'Welcome email',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      });

      expect(studentRepositorySpy).toBeCalledTimes(1);
      expect(studentRepositorySpy).toBeCalledWith(
        Student.create({
          email: 'tony@email.com',
          firstName: 'Tony',
          lastName: 'Toth',
        }).getValue(),
      );

      expect(response).toBeInstanceOf(Result<Student>);
      expect(response).toEqual({
        data: {
          email: 'tony@email.com',
          firstName: 'Tony',
          lastName: 'Toth',
        },
        errors: [],
      });
    });
  });

  test("Fails to register a student that doesn't have an email address", ({
    given,
    when,
    then,
  }) => {
    let registerStudentUseCase: RegisterStudent;
    let studentInput: Partial<StudentInput>;
    let studentRepository: StudentRepositoryFake;
    let studentRepositorySpy: unknown;
    let emailService: EmailServiceSpy;

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();

      emailService = new EmailServiceSpy();

      registerStudentUseCase = new RegisterStudent(
        studentRepository,
        emailService,
      );

      studentRepositorySpy = jest.spyOn(studentRepository, 'save');
    });

    when(
      'the student is trying to register using a wrong email address',
      () => {
        studentInput = {
          firstName: 'Hello',
          lastName: 'World',
          email: '',
        };
      },
    );

    then(
      'the student should get an error that there was an error while trying to register',
      async () => {
        const response = await registerStudentUseCase.execute(studentInput);

        expect(studentRepositorySpy).toBeCalledTimes(0);

        expect(response).toEqual({
          data: null,
          errors: [
            {
              message: 'Invalid email address',
              type: 'InvalidEmailAddress',
            },
          ],
        });
      },
    );
  });

  test("Fails to register a student that doesn't have a firstName", ({
    given,
    when,
    then,
  }) => {
    let registerStudentUseCase: RegisterStudent;
    let studentInput: Partial<StudentInput>;
    let studentRepository: StudentRepositoryFake;
    let studentRepositorySpy: unknown;
    let emailService: EmailServiceSpy;

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();

      emailService = new EmailServiceSpy();

      registerStudentUseCase = new RegisterStudent(
        studentRepository,
        emailService,
      );

      studentRepositorySpy = jest.spyOn(studentRepository, 'save');
    });

    when('the student is trying to register without firstName', () => {
      studentInput = {
        lastName: 'World',
        email: 'tony@world.com',
        firstName: '',
      };
    });

    then(
      'the student should get an error that he needs to add his firstName in order to register',
      async () => {
        const response = await registerStudentUseCase.execute(studentInput);

        expect(studentRepositorySpy).toBeCalledTimes(0);

        expect(response).toEqual({
          data: null,
          errors: [
            {
              message: 'Invalid firstName',
              type: 'InvalidFirstName',
            },
          ],
        });
      },
    );
  });

  test("Fails to register a student that doesn't have a lastName", ({
    given,
    when,
    then,
  }) => {
    let registerStudentUseCase: RegisterStudent;
    let studentInput: Partial<StudentInput>;
    let studentRepository: StudentRepositoryFake;
    let studentRepositorySpy: unknown;
    let emailService: EmailServiceSpy;

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();
      emailService = new EmailServiceSpy();

      registerStudentUseCase = new RegisterStudent(
        studentRepository,
        emailService,
      );

      studentRepositorySpy = jest.spyOn(studentRepository, 'save');
    });

    when('the student is trying to register without lastName', () => {
      studentInput = {
        firstName: 'World',
        email: 'tony@world.com',
        lastName: '',
      };
    });
    then(
      'the student should get an error that he needs to add his lastName in order to register',
      async () => {
        const response = await registerStudentUseCase.execute(studentInput);

        expect(studentRepositorySpy).toBeCalledTimes(0);

        expect(response).toEqual({
          data: null,
          errors: [
            {
              message: 'Invalid lastName',
              type: 'InvalidLastName',
            },
          ],
        });
      },
    );
  });

  test('Fails to create a student if it already exists', ({
    given,
    when,
    then,
  }) => {
    let registerStudentUseCase: RegisterStudent;
    let response: unknown;
    let studentRepository: StudentRepositoryFake;
    let studentRepositorySpy: unknown;
    let emailService: EmailServiceSpy;

    given('a student is already registered', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withStudents([
          {
            email: 'tony@email.com',
            firstName: 'Tony',
            lastName: 'Toth',
          },
        ])
        .build();

      emailService = new EmailServiceSpy();

      registerStudentUseCase = new RegisterStudent(
        studentRepository,
        emailService,
      );

      studentRepositorySpy = jest.spyOn(studentRepository, 'save');
    });

    when('the student is trying to register', async () => {
      const studentInput: StudentInput = {
        email: 'tony@email.com',
        firstName: 'Tony',
        lastName: 'Toth',
      };

      response = await registerStudentUseCase.execute(studentInput);
    });

    then(
      'the student should get an error that he was already registered',
      () => {
        expect(studentRepositorySpy).toBeCalledTimes(0);

        expect(response).toEqual({
          data: null,
          errors: [
            {
              message: 'Student already created',
              type: 'StudentAlreadyCreated',
            },
          ],
        });
      },
    );
  });
});
