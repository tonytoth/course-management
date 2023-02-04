import { Student } from './student.entity';

describe('student entity', () => {
  it('should exist', () => {
    expect(Student).toBeDefined();
  });

  it('should have a create method', () => {
    expect(Student.create).toBeDefined();
  });
});
