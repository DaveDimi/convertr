import { Validators } from "@angular/forms";

export class FormUtils {
  static onlyLetters = /^[a-zA-Z]+$/;
  static validTelephone =
    /^\+?(\d{1,4})?[\s-]?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{6,10}$/;
  static onlyLettersDigitsCommaAndSpace = /^[a-zA-Z0-9, ]+$/;
  static validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  static validUrl =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  static validPostCode = /^[A-Za-z0-9 -]{3,10}$/;
  static maxLength100 = 100;
  static maxLength250 = 250;

  static UrlValidators = [
    Validators.pattern(this.validUrl),
    Validators.maxLength(this.maxLength250),
  ];

  static NameValidators = [
    Validators.pattern(this.onlyLetters),
    Validators.maxLength(this.maxLength100),
  ];

  static EmailValidators = [
    Validators.pattern(this.validEmail),
    Validators.maxLength(this.maxLength250),
  ];

  static PostCodeValidators = [Validators.pattern(this.validPostCode)];
}
