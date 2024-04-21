import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormUtils } from "../../../shared/utils/form.utils";

@Injectable()
export class AdvertiserFormService {
  formConfig = [
    {
      label: "Company Name",
      controlName: "name",
    },
    {
      label: "Company URL",
      controlName: "orgurl",
    },

    {
      label: "First Name",
      controlName: "firstName",
    },

    {
      label: "Last Name",
      controlName: "lastName",
    },

    {
      label: "Email",
      controlName: "email",
    },
    {
      label: "Telephone",
      controlName: "telephone",
    },
    {
      label: "Address",
      controlName: "address",
    },
    {
      label: "City",
      controlName: "city",
    },
    {
      label: "Post Code",
      controlName: "postcode",
    },
  ];
  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>("", [
        Validators.required,
        Validators.pattern(FormUtils.onlyLettersDigitsCommaAndSpace),
        Validators.maxLength(FormUtils.maxLength100),
      ]),
      orgurl: new FormControl<string>("", [
        Validators.required,
        ...FormUtils.UrlValidators,
      ]),
      firstName: new FormControl<string>("", [
        Validators.required,
        ...FormUtils.NameValidators,
      ]),
      lastName: new FormControl<string>("", [
        Validators.required,
        ...FormUtils.NameValidators,
      ]),
      email: new FormControl<string>("", [
        Validators.required,
        ...FormUtils.EmailValidators,
      ]),
      telephone: new FormControl<string>("", [
        Validators.required,
        Validators.pattern(FormUtils.validTelephone),
      ]),
      address: new FormControl<string>("", [
        Validators.required,
        Validators.pattern(FormUtils.onlyLettersDigitsCommaAndSpace),
        Validators.maxLength(FormUtils.maxLength250),
      ]),
      city: new FormControl<string>("", [
        Validators.required,
        ...FormUtils.NameValidators,
      ]),
      postcode: new FormControl<string>("", [
        Validators.required,
        ...FormUtils.PostCodeValidators,
      ]),
    });
  }
}
