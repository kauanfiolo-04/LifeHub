import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('tasks')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: CreateNoteDTO) {
    return this.notesService.create(body);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateNoteDTO) {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
