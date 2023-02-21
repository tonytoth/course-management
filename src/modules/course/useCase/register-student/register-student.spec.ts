import path from 'path';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { Student } from '../../domain/student.entity';
import { Result } from '../../domain/result';
import { RegisterStudent } from './register-student';
import { StudentRepositoryFake } from '../../fake/student.repository.fake';
import { StudentRepositoryBuilder } from '../../builder/student-repo.builder';

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

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();
      registerStudentUseCase = new RegisterStudent(studentRepository);
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
    and,
  }) => {
    let registerStudentUseCase: RegisterStudent;
    let studentInput: Partial<StudentInput>;
    let studentRepository: StudentRepositoryFake;

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();
      registerStudentUseCase = new RegisterStudent(studentRepository);
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

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();
      registerStudentUseCase = new RegisterStudent(studentRepository);
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

    given('a student is not registered yet', () => {
      studentRepository = new StudentRepositoryBuilder()
        .withDefaultValues()
        .build();
      registerStudentUseCase = new RegisterStudent(studentRepository);
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
      registerStudentUseCase = new RegisterStudent(studentRepository);
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
