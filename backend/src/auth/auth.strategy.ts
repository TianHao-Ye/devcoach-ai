import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
}

const extractTokenFromCookie = (request: Request): string | null => {
  return request.cookies?.access_token ?? null;
};

// 'PassportStrategy' is authentication library, passport-jwt check signature and expired time
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    // extract JWT from cookie, verify it
    super({
      // where to find JWT, cuz JWT not in authorization header, need to register self-define function to find it
      jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookie]),
      ignoreExpiration: false,
      // use which secret to verify JWT
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // execute validate after JWT found, its correct and not expired
  validate(payload: JwtPayload) {
    // the returned value become 'request.user'
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
