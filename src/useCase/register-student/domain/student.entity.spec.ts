import { Student } from './student.entity';

describe('student entity', () => {
  it('should exist', () => {
    expect(Student).toBeDefined();
  });

  it('should have a create method', () => {
    expect(Student.create).toBeDefined();
  });

  it('should have a create method which accepts an object as parameters', () => {
    expect(
      Student.create({ email: 'hello@hello.hello', firstName: 'FirstStudent' }),
    ).toBeInstanceOf(Student);
  });

  it('should be able to give us the student email', () => {
    const student = Student.create({
      email: 'tony@hello.com',
      firstName: 'Student',
    });

    expect(student.getEmail).toBe('tony@hello.com');
  });

  it('should be able to give us the student firstName', () => {
    const student = Student.create({
      email: 'tony@hello.com',
      firstName: 'Tony',
    });

    expect(student.getFirstName).toBe('Tony');
  });

  it('should be able to give us the student lastName', () => {
    const student = Student.create({
      email: 'tony@hello.com',
      firstName: 'Tony',
      lastName: 'Toth',
    });
    expect(student.getLastName).toBe('Toth');
  });
});
