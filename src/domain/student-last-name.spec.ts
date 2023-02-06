import { StudentLastName } from './student-last-name';

describe('student last name', () => {
  it('should have a class', () => {
    expect(StudentLastName).toBeDefined();
  });

  it('should have a method called create', () => {
    expect(StudentLastName.create).toBeDefined();
  });

  it('should return a result with the last name World', () => {
    expect(StudentLastName.create('World')).toMatchObject({
      data: 'World',
      errors: [],
    });
  });

  it('should return a result with error if the last name is empty', () => {
    expect(StudentLastName.create('')).toMatchObject({
      data: null,
      errors: [{ message: 'Invalid firstName' }],
    });
  });
});
