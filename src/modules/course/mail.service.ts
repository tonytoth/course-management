export interface MailService {
  sendEmail(parameters: any): Promise<void>;
}
