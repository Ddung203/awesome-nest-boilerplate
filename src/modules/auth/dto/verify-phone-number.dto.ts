import { BooleanField, StringField } from "../../../decorators";

export class VerifyPhoneNumberDto {
  @StringField()
  readonly phoneNumber!: string;

  @BooleanField()
  isExist!: boolean;

  constructor(isExist: boolean) {
    this.isExist = isExist;
    this.phoneNumber = this.phoneNumber;
  }
}
