

export class AuthController {
  private static email: string;

  static setEmail(value: string): void {
    AuthController.email = value;
  }

  static getEmail(): string {
    return AuthController.email;
  }
}
