import { StudentLastName } from './student-last-name';

describe('student last name', () => {
  it('should have a class', () => {
    expect(StudentLastName).toBeDefined();
  });

  it('should have a method called create', () => {
    expect(StudentLastName.create).toBeDefined();
  });
});
