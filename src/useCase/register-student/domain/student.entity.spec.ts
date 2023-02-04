import { Student } from './student.entity';

describe('student entity', () => {
  it('should exist', () => {
    expect(Student).toBeDefined();
  });

  it('should have a create method', () => {
    expect(Student.create).toBeDefined();
  });

  it('should have a create method which accepts an object as parameters', () => {
    expect(Student.create({ email: 'hello@hello.hello' })).toBeInstanceOf(
      Student,
    );
  });

  it('should be able to give us the student email', () => {
    const student = Student.create({ email: 'tony@hello.com' });

    expect(student.getEmail).toBe('tony@hello.com');
  });
});
