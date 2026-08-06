import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//AuthGuard("jwt") tells Passport to use JwtStrategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
