import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class NotesService {
  private notes: Note[] = [];

  throwNotFoundException(): never {
    throw new NotFoundException('Note not found!');
  }

  create(dto: CreateNoteDTO) {
    const note = {
      id: randomUUID().toString(),
      ...dto,
      tags: dto.tags ?? [],
      createdAt: new Date()
    };

    this.notes.push(note);

    return note;
  }

  findAll() {
    return this.notes;
  }

  findOne(id: string) {
    return this.notes.find(note => note.id === id);
  }

  update(id: string, dto: UpdateNoteDTO) {
    const note = this.notes.find(note => note.id === id);

    if (!note) this.throwNotFoundException();

    const newNotes = this.notes.map(n => {
      if (n.id === note.id) {
        return { ...n, ...dto };
      }

      return n;
    });

    this.notes = newNotes;

    return this.notes.find(note => note.id === id);
  }

  remove(id: string) {
    const note = this.notes.find(note => note.id === id)!;

    this.notes = this.notes.filter(n => n.id !== note.id);

    return note;
  }
}
