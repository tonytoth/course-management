import { MailService } from '../mail.service';

class FakeEmailService implements MailService {
  async sendEmail(): Promise<void> {
    console.log('void');
  }
}

export { FakeEmailService };
