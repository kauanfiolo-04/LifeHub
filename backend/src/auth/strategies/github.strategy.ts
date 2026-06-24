import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { OAuthProfile } from '../types/oauth-profile.type';
import { OAuthProvider } from '../enum/oauth-provider.enum';
import { GithubProfile } from '../types/github-raw-profile.type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email']
    });
  }

  validate(accessToken: string, refreshToken: string, profile: GithubProfile): OAuthProfile {
    return {
      provider: OAuthProvider.GITHUB,
      providerAccountId: profile.id,
      email: profile.emails?.[0]?.value ?? undefined,
      name: profile.username
    };
  }
}
