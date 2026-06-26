import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayload } from '../auth/decorators/user.decorator';
import { type JwtPayload } from '../auth/types/jwt-payload.type';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateNoteDTO, @TokenPayload() payload: JwtPayload) {
    return this.notesService.create(body, payload);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateNoteDTO, @TokenPayload() payload: JwtPayload) {
    return this.notesService.update(id, body, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.notesService.remove(id, payload);
  }
}
