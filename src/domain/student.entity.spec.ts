import { Result } from './result';
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
      Student.create({
        email: 'hello@hello.hello',
        firstName: 'FirstStudent',
        lastName: 'New',
      }),
    ).toBeInstanceOf(Result<Student>);
  });

  it('should be able to give us the student email', () => {
    const student = Student.create({
      email: 'tony@hello.com',
      firstName: 'Student',
      lastName: 'Toth',
    });

    expect(student.getEmail).toBe('tony@hello.com');
  });

  it('should be able to give us the student firstName', () => {
    const student = Student.create({
      email: 'tony@hello.com',
      firstName: 'Tony',
      lastName: 'Toth',
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

  it('should be able to give us an error if the email is not valid', () => {
    const student = Student.create({
      email: 't@aa.cc',
      firstName: 'Tony',
      lastName: 'Toth',
    });

    expect(student).toBeInstanceOf(Result<null>);
    expect(student).toMatchObject({
      data: null,
      errors: [
        {
          message: 'Invalid email address',
        },
      ],
    });
  });
});
