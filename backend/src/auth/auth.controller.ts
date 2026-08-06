import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // controller owns http behaviour
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    // next line allow modify the Express response while still letting NestJS serialize returned object normally.
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);

    response.cookie('access_token', result.access_token, {
      // httpOnly: true prevents frontend js from reading the JWT
      httpOnly: true,
      // use https in production env
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      user: result.user,
    };
  }
}
