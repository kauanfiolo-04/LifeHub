import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TokenPayload } from './decorators/user.decorator';
import { type JwtPayload } from './types/jwt-payload.type';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { OAuthProfile, type RequestWithOAuth } from './types/oauth-profile.type';
import { type Request, type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  private async handleOAuth(user: OAuthProfile, res: Response) {
    const { refreshToken } = await this.authService.oauthLogin(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: this.configService.get<string>('globalConfig.environment') === 'production',
      maxAge: this.configService.get<number>('globalConfig.jwt.jwt_refresh_ttl')
    });

    const frontendUrl = this.configService.get<string>('globalConfig.frontend_url');

    return res.redirect(`${frontendUrl}/callback`);
  }

  @Post('signup')
  signup(@Body() body: SignupDTO) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto);

    const { accessToken, refreshToken } = await this.authService.login(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: this.configService.get<string>('globalConfig.environment') == 'production',
      maxAge: this.configService.get<number>('globalConfig.jwt.jwt_refresh_ttl')
    });

    return { accessToken };
  }

  @Post('refresh')
  refresh(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken as string;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return this.authService.refreshTokens(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response, @TokenPayload() tokenPayload: JwtPayload) {
    res.clearCookie('refreshToken');

    return this.authService.logout(tokenPayload);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: RequestWithOAuth, @Res() res: Response) {
    return this.handleOAuth(req.user, res);
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Req() req: RequestWithOAuth, @Res() res: Response) {
    return this.handleOAuth(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@TokenPayload() tokenPayload: JwtPayload) {
    return this.authService.getMe(tokenPayload.sub);
  }
}
