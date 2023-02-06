import { StudentFirstName } from './student-first-name';

describe('Student firstName', () => {
  it('should exist', () => {
    expect(StudentFirstName).toBeDefined();
  });

  it('should have a method called create with a parameter', () => {
    expect(StudentFirstName.create('hello')).toBeDefined();
  });

  it('should return hello as firstName', () => {
    expect(StudentFirstName.create('hello')).toMatchObject({
      data: 'hello',
      errors: [],
    });
  });

  it('should return an error if the firstName is an empty string', () => {
    expect(StudentFirstName.create('')).toMatchObject({
      data: null,
      errors: [{ message: 'Invalid firstName' }],
    });
  });

  it('should return an error if the firstName length is smaller than 2', () => {
    expect(StudentFirstName.create('I')).toMatchObject({
      data: null,
      errors: [{ message: 'firstName length should be greater than 2' }],
    });
  });
});
