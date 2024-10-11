import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { validateHash } from "../../common/utils";
import type { RoleType } from "../../constants";
import { TokenType } from "../../constants";
import { UserNotFoundException } from "../../exceptions";
import { ApiConfigService } from "../../shared/services/api-config.service";
import type { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { TokenPayloadDto } from "./dto/token-payload.dto";
import type { UserLoginDto } from "./dto/user-login.dto";
import { VerifyPhoneNumberDto } from "./dto/verify-phone-number.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: { role: RoleType; userId: Uuid }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      phoneNumber: userLoginDto.phoneNumber,
    });

    const isPasswordValid = await validateHash(userLoginDto.password, user?.password);

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user!;
  }

  async validatePhoneNumer(verifyPhoneNumberDto: VerifyPhoneNumberDto): Promise<VerifyPhoneNumberDto> {
    const user = await this.userService.findOne({
      phoneNumber: verifyPhoneNumberDto.phoneNumber,
    });

    return new VerifyPhoneNumberDto(!!user);
  }
}
