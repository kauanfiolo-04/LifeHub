import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { OAuthProfile } from '../types/oauth-profile.type';
import { OAuthProvider } from '../enum/oauth-provider.enum';
import { GoogleProfile } from '../types/google-profile.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
