import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';

export type ResponseToken = { token: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<ResponseToken> {
    const { email, password } = signUpDto;

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.usersService.createUser({
      email,
      passwordHash,
    });

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<ResponseToken> {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
