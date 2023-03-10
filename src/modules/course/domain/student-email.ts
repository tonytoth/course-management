import { Result } from './result';

interface StudentEmailI {
  email: string;
  getValue: () => string;
}
export class StudentEmail implements StudentEmailI {
  email: string;

  public getValue(): string {
    return this.email;
  }

  private constructor(email: string) {
    this.email = email;
  }

  isValid(email: string) {
    const emailSplittedByAnchor = email.split('@');
    const userNameFromEmail = emailSplittedByAnchor[0];
    const domainAndTopLevelDomainFromEmail = emailSplittedByAnchor[1];

    if (!domainAndTopLevelDomainFromEmail) {
      return false;
    }

    if (userNameFromEmail.length < 3) {
      return false;
    }

    const arrayWithDomainAndTopLevelDomain =
      domainAndTopLevelDomainFromEmail.split('.');

    const domain = arrayWithDomainAndTopLevelDomain[0];

    if (domain.length < 3) {
      return false;
    }

    const topLevelDomain = arrayWithDomainAndTopLevelDomain[1];

    if (!topLevelDomain || topLevelDomain.length < 2) {
      return false;
    }

    return true;
  }

  public static create(email: string): Result<StudentEmail | null> {
    const studentEmail = new StudentEmail(email);

    if (!studentEmail.isValid(email)) {
      return Result.isNotFine({
        message: 'Invalid email address',
        type: 'InvalidEmailAddress',
      });
    }

    return Result.isFine(studentEmail);
  }
}
