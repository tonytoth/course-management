import { Student } from './student.entity';

describe('student entity', () => {
  it('should exist', () => {
    expect(Student).toBeDefined();
  });

  it('should have a create method', () => {
    expect(Student.create).toBeDefined();
  });

  it('should have a create method which accepts an object as parameters', () => {
    expect(Student.create({})).toBeInstanceOf(Object);
  });

  it('should return an error object if the email is not valid', () => {
    expect(Student.create({ email: 'a@a.a' })).toMatchObject({
      message: 'Email address is invalid',
    });
  });
});
