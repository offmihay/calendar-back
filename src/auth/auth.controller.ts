import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, ResponseToken } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<ResponseToken> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  login(@Body() signInDto: SignInDto): Promise<ResponseToken> {
    return this.authService.signIn(signInDto);
  }
}
