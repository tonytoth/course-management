import { MailService } from '../mail.service';

class FakeEmailService implements MailService {
  calledTimes = 0;

  constructor() {
    this.calledTimes = 0;
  }

  get getCalledTimes() {
    return this.calledTimes;
  }

  async sendEmail(): Promise<void> {
    this.calledTimes++;
  }
}

export { FakeEmailService };
