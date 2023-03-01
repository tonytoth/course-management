export interface MailService {
  sendEmail(): Promise<void>;
}
