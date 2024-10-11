import { AbstractDto } from "../../../common/dto/abstract.dto";
import { RoleType } from "../../../constants";
import {
  BooleanFieldOptional,
  EmailFieldOptional,
  EnumFieldOptional,
  NumberFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
} from "../../../decorators";
import type { UserEntity } from "../user.entity";

export class UserDto extends AbstractDto {
  @StringFieldOptional({ nullable: true })
  fullName?: string | null;

  @PhoneFieldOptional({ nullable: true })
  phoneNumber?: string | null;

  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @EnumFieldOptional(() => RoleType, { default: RoleType.USER })
  role?: RoleType;

  @StringFieldOptional({ nullable: true })
  password?: string | null;

  @NumberFieldOptional({ default: 0 })
  credit?: number | null;

  @BooleanFieldOptional({ default: false })
  isBanned?: boolean | null;

  constructor(user: UserEntity) {
    super(user);
    this.fullName = user.fullName;
    this.phoneNumber = user.phoneNumber;
    this.password = "";
    this.role = user.role;
    this.email = user.email;
    this.isBanned = user.isBanned;
  }
}
