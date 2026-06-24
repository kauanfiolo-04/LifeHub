import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { TokenPayload } from '../auth/decorators/user.decorator';
import { type JwtPayload } from '../auth/types/jwt-payload.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() body: CreateUserDTO) {
  //   return this.usersService.create(body);
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  update(@Param('id') id: string, @Body() body: UpdateUserDTO, @TokenPayload() payload: JwtPayload) {
    return this.usersService.update(id, body, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove')
  remove(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.usersService.remove(id, payload);
  }
}
