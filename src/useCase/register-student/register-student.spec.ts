import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';

import { RegisterStudent } from './register-student';

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

    given('a student is not registered yet', () => {
      registerStudentUseCase = new RegisterStudent();
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

  test('Fails to register a student', ({ given, when, then, and }) => {
    let registerStudentUseCase: RegisterStudent;
    let studentInput: Partial<StudentInput>;

    given('a student is not registered yet', () => {
      registerStudentUseCase = new RegisterStudent();
    });

    when('the student is trying to register', () => {
      studentInput = {
        firstName: 'Hello',
        lastName: 'World',
      };
    });

    and('he types a wrong email', () => {
      studentInput.email = '';
    });

    then(
      'the student should get an error that there was an error while trying to register',
      async () => {
        const response = await registerStudentUseCase.execute(studentInput);

        expect(response).toEqual({
          data: null,
          errors: [
            {
              message: 'Invalid email address',
            },
          ],
        });
      },
    );
  });
});