import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TokenPayload } from './decorators/user.decorator';
import { type JwtPayload } from './types/jwt-payload.type';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { type RequestWithOAuth } from './types/oauth-profile.type';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

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
      sameSite: 'lax',
      secure: this.configService.get<string>('globalConfig.environment') == 'production',
      maxAge: this.configService.get<number>('globalConfig.jwt.jwt_refresh_ttl')
    });

    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }, @TokenPayload() payload: JwtPayload) {
    return this.authService.refreshTokens(payload.sub, body.refreshToken);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');

    return { success: true };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: RequestWithOAuth) {
    return this.authService.oauthLogin(req.user);
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Req() req: RequestWithOAuth) {
    return this.authService.oauthLogin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@TokenPayload() tokenPayload: JwtPayload) {
    return tokenPayload;
  }
}
