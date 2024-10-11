import { PhoneField, StringField } from "../../../decorators";

export class UserLoginDto {
  @PhoneField()
  readonly phoneNumber!: string;

  @StringField()
  readonly password!: string;
}
