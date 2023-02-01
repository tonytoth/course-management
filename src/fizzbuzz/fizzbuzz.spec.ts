import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  it('exists', () => {
    expect(fizzbuzz).toBeDefined();
  });

  it('should throw an eror if value < 1', () => {
    expect(() => {
      fizzbuzz(0);
    }).toThrow(Error);
  });

  it('should thrown an error if value > 100', () => {
    expect(() => {
      fizzbuzz(101);
    }).toThrow(Error);
  });

  it('should return "1" ', () => {
    expect(fizzbuzz(1)).toBe('1');
  });

  it('should return "2" ', () => {
    expect(fizzbuzz(2)).toBe('2');
  });

  it('should return Fizz', () => {
    expect(fizzbuzz(3)).toBe('Fizz');
  });

  it('should return Buzz', () => {
    expect(fizzbuzz(5)).toBe('Buzz');
  });

  it('should return Fizz for 9', () => {
    expect(fizzbuzz(9)).toBe('Fizz');
  });

  it('should return Buzz for 10', () => {
    expect(fizzbuzz(10)).toBe('Buzz');
  });

  it('should return FizzBuzz for 15', () => {
    expect(fizzbuzz(15)).toBe('FizzBuzz');
  });

  it('should return Fizz for 18', () => {
    expect(fizzbuzz(18)).toBe('Fizz');
  });

  it('should return Fizz for 27', () => {
    expect(fizzbuzz(27)).toBe('Fizz');
  });

  it('should return FizzBuzz for 30', () => {
    expect(fizzbuzz(30)).toBe('FizzBuzz');
  });

  it('should return Fizz for 33', () => {
    expect(fizzbuzz(33)).toBe('Fizz');
  });

  it('should return Buzz for 35', () => {
    expect(fizzbuzz(35)).toBe('Buzz');
  });
});
