import { Request } from 'express';
import { OAuthProvider } from '../enum/oauth-provider.enum';

export interface OAuthProfile {
  provider: OAuthProvider;
  providerAccountId: string;
  email?: string;
  name?: string;
}

export interface RequestWithOAuth extends Request {
  user: OAuthProfile;
}
