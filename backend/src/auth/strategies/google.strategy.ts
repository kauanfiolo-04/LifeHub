import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { OAuthProfile } from '../types/oauth-profile.type';
import { OAuthProvider } from '../enum/oauth-provider.enum';
import { GoogleProfile } from '../types/google-profile.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('globalConfig.oauth.google_client_id')!,
      clientSecret: configService.get<string>('globalConfig.oauth.google_secret')!,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile']
    });
  }

  validate(accessToken: string, refreshToken: string, profile: GoogleProfile): OAuthProfile {
    return {
      provider: OAuthProvider.GOOGLE,
      providerAccountId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName
    };
  }
}
