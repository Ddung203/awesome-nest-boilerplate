import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../user/dtos/user.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LoginPayloadDto } from "./dto/login-payload.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { VerifyPhoneNumberDto } from "./dto/verify-phone-number.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: UserDto, description: "Successfully Registered" })
  async userRegister(@Body() userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser;
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: "User info with access token",
  })
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Post("verify-phone-number")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VerifyPhoneNumberDto,
    description: "Status of user's phone number",
  })
  async verifyPhoneNumber(@Body() verifyPhoneNumberDto: VerifyPhoneNumberDto): Promise<VerifyPhoneNumberDto> {
    const verification = await this.authService.validatePhoneNumer(verifyPhoneNumberDto);

    return verification;
  }
}
