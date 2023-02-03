interface StudentInput {
  email: string;
  firstName: string;
  lastName: string;
}

class RegisterStudent {
  constructor() {}

  async execute(input: Partial<StudentInput>) {
    if (input.email === '') {
      return {
        data: null,
        errors: [{ message: 'Invalid email address' }],
      };
    }

    return {
      data: input,
      errors: [],
    };
  }
}

export { RegisterStudent };
