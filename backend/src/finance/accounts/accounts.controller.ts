import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { TokenPayload } from '../../auth/decorators/user.decorator';
import { type JwtPayload } from '../../auth/types/jwt-payload.type';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateAccountDTO } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateAccountDTO, @TokenPayload() payload: JwtPayload) {
    return this.accountsService.createAccount(body, payload);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateAccountDTO, @TokenPayload() payload: JwtPayload) {
    return this.accountsService.update(id, body, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.accountsService.remove(id, payload);
  }
}
