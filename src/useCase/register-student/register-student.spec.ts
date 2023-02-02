import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';

import { RegisterStudent } from './register-student';

const feature = loadFeature(path.join(__dirname, './register-student.feature'));

defineFeature(feature, (test) => {
  test('Successfully register a student', ({ given, when, then }) => {
    given('a student is not registered yet', () => {
        const registerStudentUseCase = new RegisterStudent();
    });

    when('the student is trying to get registered', () => {

    });

    then('the student should be successfully registered', () => {

    });
  });
});
