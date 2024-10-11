import { Column, Entity } from "typeorm";
import { UseDto } from "../../decorators";
import { AbstractEntity } from "../../common/abstract.entity";
import { RoleType } from "../../constants";
import { UserDto } from "./dtos/user.dto";

@Entity({ name: "users" })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true, type: "varchar" })
  fullName!: string | null;

  @Column({ unique: true, nullable: true, type: "varchar" })
  email!: string | null;

  @Column({ nullable: true, type: "varchar" })
  password!: string | null;

  @Column({ nullable: true, type: "varchar" })
  phoneNumber!: string | null;

  @Column({ type: "enum", enum: RoleType, default: RoleType.USER })
  role!: RoleType;

  @Column({ type: "int", default: 0 })
  credit!: number | null;

  @Column({ nullable: true, type: "boolean", default: false })
  isBanned!: boolean | null;
}
