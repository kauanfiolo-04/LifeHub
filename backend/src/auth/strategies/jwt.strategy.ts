import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../jwt-payload.type';
import { GlobalConfig } from '../../global-config/global-config.type';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService<GlobalConfig>) {
    console.log('STRATEGY CONFIG:', {
      access: configService.get('jwt.jwt_access_secret', { infer: true })
    });

    const secret = configService.get<string>('jwt.jwt_access_secret', { infer: true });

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email
    };
  }
}
