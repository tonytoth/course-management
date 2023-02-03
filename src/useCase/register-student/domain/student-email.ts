export class StudentEmail {
  public static validate(email: string) {
    const splitByAnchor = email.split('@');
    const userNameFromEmail = splitByAnchor[0];
    const domainAndTopLevelDomainFromEmail = splitByAnchor[1];

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

    if (topLevelDomain.length < 2) {
      return false;
    }

    return true;
  }
}
