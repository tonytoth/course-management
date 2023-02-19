import { Result } from './result';

describe('Result', () => {
  it('should be defined', () => {
    expect(Result).toBeDefined();
  });

  it('should be able to return an student email and no errors if the response is fine', () => {
    const result = Result.isFine<string>('tony@hello.com');

    expect(result).toMatchObject({
      data: 'tony@hello.com',
      errors: [],
    });
    expect(result.getFirstError()).toBe(undefined);
    expect(result.getValue()).toBe('tony@hello.com');
    expect(result).toBeInstanceOf(Result<string>);
  });

  it('should be able to return an error if the email is not valid', () => {
    const result = Result.isNotFine('aa@aa.c');

    expect(result).toMatchObject({
      data: null,
      errors: [{ message: 'aa@aa.c' }],
    });
    expect(result.getFirstError()).toMatchObject({ message: 'aa@aa.c' });
    expect(result.hasErrors()).toBe(true);
    expect(result).toBeInstanceOf(Result<null>);
  });

  it('should be able to return an error type along side the error message', () => {
    const result = Result.isNotFine(
      'Student already exists',
      'StudentAlreadyCreated',
    );

    expect(result).toMatchObject({
      data: null,
      errors: [
        { message: 'Student already exists', type: 'StudentAlreadyCreated' },
      ],
    });
    expect(result.hasErrors()).toBe(true);
    expect(result).toBeInstanceOf(Result<null>);
  });
});
