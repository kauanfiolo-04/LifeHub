import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TokenPayload } from '../../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { type JwtPayload } from '../../auth/types/jwt-payload.type';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { FindTransactionDTO } from './dto/find-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateTransactionDTO, @TokenPayload() payload: JwtPayload) {
    return this.transactionService.create(body, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@TokenPayload() payload: JwtPayload, @Query() query: FindTransactionDTO) {
    return this.transactionService.findAll(payload, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, payload: JwtPayload) {
    return this.transactionService.getDetail(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTransactionDTO, @TokenPayload() payload: JwtPayload) {
    return this.transactionService.update(id, body, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.transactionService.remove(id, payload);
  }
}
