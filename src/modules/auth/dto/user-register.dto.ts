import { EmailField, PasswordField, PhoneField, StringField } from "../../../decorators";

export class UserRegisterDto {
  @StringField()
  readonly fullName!: string;

  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @PhoneField()
  readonly phoneNumber!: string;
}
