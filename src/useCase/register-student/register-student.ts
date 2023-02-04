import { StudentEmail } from './domain/student-email';

interface StudentInput {
  email: string;
  firstName: string;
  lastName: string;
}

class RegisterStudent {
  constructor() {}

  async execute(input: Partial<StudentInput>) {
    const studentEmail = StudentEmail.create(input.email || '');

    if (!studentEmail) {
      return {
        data: null,
        errors: [{ message: 'Invalid email address' }],
      };
    }

    if (input.firstName === '') {
      return {
        data: null,
        errors: [{ message: 'Invalid firstName' }],
      };
    }

    return {
      data: input,
      errors: [],
    };
  }
}

export { RegisterStudent };
