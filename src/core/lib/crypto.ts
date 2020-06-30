import { genSalt, hash } from 'bcrypt';

export class Crypto {
  static async generateSalt(): Promise<string> {
    return genSalt();
  }

  static async hash(content: string, salt: string): Promise<string> {
    return hash(content, salt);
  }

  static async isEqual(hashedContent, salt, submittedContent): Promise<boolean> {
    const hashedSubmittedContent = await hash(submittedContent, salt);
    return hashedContent === hashedSubmittedContent;
  }
}