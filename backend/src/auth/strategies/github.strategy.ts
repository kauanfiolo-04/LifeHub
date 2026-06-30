import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { OAuthProfile } from '../types/oauth-profile.type';
import { OAuthProvider } from '../enum/oauth-provider.enum';
import { GithubProfile } from '../types/github-raw-profile.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('globalConfig.oauth.github_client_id')!,
      clientSecret: configService.get<string>('globalConfig.oauth.github_client_secret')!,
      callbackURL: configService.get<string>('globalConfig.oauth.github_callback_url')!,
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
