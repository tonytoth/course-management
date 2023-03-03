import { MailService } from '../mail.service';

class EmailServiceSpy implements MailService {
  calls: { method: string; parameters: any }[] = [];

  constructor() {
    this.calls = [];
  }

  getCalledTimes(method: string) {
    return this.calls.filter((call) => call.method == method).length;
  }

  getParametersFor(method: string) {
    return this.calls.find((call) => call.method === method);
  }

  setCall(method: string, parameters: any) {
    this.calls.push({
      method,
      parameters,
    });
  }

  async sendEmail(parameters: any): Promise<void> {
    this.setCall('sendEmail', parameters);
  }
}

export { EmailServiceSpy };
