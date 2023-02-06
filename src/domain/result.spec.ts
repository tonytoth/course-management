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

    expect(result).toBeInstanceOf(Result);
  });

  it('should be able to return an error if the email is not valid', () => {
    const result = Result.isNotFine('aa@aa.c');

    expect(result).toMatchObject({
      data: null,
      errors: [{ message: 'aa@aa.c' }],
    });

    expect(result).toBeInstanceOf(Result);
  });
});
