import { Result } from './result';
import { StudentEmail } from './student-email';

describe('student email', () => {
  it('should exist', () => {
    expect(StudentEmail).toBeDefined();
  });

  it('should have a creation method', () => {
    expect(StudentEmail.create).toBeDefined();
  });

  it('creation method should accept email as parameter', () => {
    expect(StudentEmail.create('hello@hello@hello')).toBeDefined();
  });

  it('should be able to tell us that tony@toth.com is a valid email', () => {
    const studentEmail = StudentEmail.create('tony@toth.com');

    expect(studentEmail).toBeInstanceOf(Result<StudentEmail>);

    const emailValue = studentEmail && studentEmail.getValue();
    expect(emailValue).toMatchObject({ email: 'tony@toth.com' });
  });

  it('should be able to tell us that empty string is not a valid email', () => {
    expect(StudentEmail.create('')).toMatchObject({
      data: null,
      errors: [
        {
          message: 'Invalid email address',
        },
      ],
    });
  });

  it('should be able to tell us that a@a.a is not a valid email', () => {
    expect(StudentEmail.create('a@a.a')).toMatchObject({
      data: null,
      errors: [
        {
          message: 'Invalid email address',
        },
      ],
    });
  });

  it('should be able to tell us that aa@aa.aa is not a valid email', () => {
    expect(StudentEmail.create('aa@aa.aa')).toMatchObject({
      data: null,
      errors: [
        {
          message: 'Invalid email address',
        },
      ],
    });
  });

  it('should be able to tell us that sadas@aa.com is not a valid email', () => {
    expect(StudentEmail.create('sadas@aa.com')).toMatchObject({
      data: null,
      errors: [
        {
          message: 'Invalid email address',
        },
      ],
    });
  });

  it('should be able to tell us that asd@asd.a is not a valid email', () => {
    expect(StudentEmail.create('asd@asd.a')).toMatchObject({
      data: null,
      errors: [
        {
          message: 'Invalid email address',
        },
      ],
    });
  });

  it('should be able to tell us that tony@worl.com is a valid email', () => {
    const studentEmail = StudentEmail.create('tony@worl.com');

    expect(studentEmail).toBeInstanceOf(Result<StudentEmail>);

    const emailValue = studentEmail && studentEmail.getValue();
    expect(emailValue).toMatchObject({ email: 'tony@worl.com' });
  });
});
