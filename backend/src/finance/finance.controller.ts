import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayload } from '../auth/decorators/user.decorator';
import type { JwtPayload } from '../auth/types/jwt-payload.type';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  metrics(@TokenPayload() payload: JwtPayload, @Query('accountName') accName?: string) {
    return this.financeService.getMetrics(payload, accName);
  }
}
