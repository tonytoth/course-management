import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';

const feature = loadFeature(path.join(__dirname, './create-student.feature'));

defineFeature(feature, (test) => {
  test('Successfully register a student', ({ given, when, then }) => {
    given('a student is not registered yet', () => {});

    when('the student is trying to get registered', () => {});

    then('the student should be successfully registered', () => {});
  });
});
