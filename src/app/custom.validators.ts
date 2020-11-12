
export class CustomValidators {
  static checkPassword(value: string, valueToCheck: string): any {
    if (value !== valueToCheck) {
      return { checkPassword: true };
    }
    return null;
  }
}
