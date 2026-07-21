import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/types/jwt-payload.type';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Note not found!');
  }

  async create(dto: CreateNoteDTO, payload: JwtPayload) {
    const newNote = this.notesRepository.create({
      ...dto,
      user: { id: payload.sub }
    });

    await this.notesRepository.save(newNote);

    return newNote;
  }

  async findAll(userId: string) {
    const notes = await this.notesRepository.find({
      where: {
        user: { id: userId }
      },
      order: { createdAt: 'desc' }
    });

    return notes;
  }

  async findOne(id: string) {
    const note = await this.notesRepository.findOneBy({ id });

    if (!note) this.throwNotFoundException();

    return note;
  }

  async update(id: string, dto: UpdateNoteDTO, payload: JwtPayload) {
    const note = await this.notesRepository.findOne({ where: { id }, relations: { user: true } });

    if (!note) this.throwNotFoundException();

    if (payload.sub !== note.user.id) throw new UnauthorizedException(`You can't change another user note.`);

    Object.assign(note, dto);

    const response = await this.notesRepository.save(note);

    const { user: _, ...data } = response;

    return data;
  }

  async remove(id: string, payload: JwtPayload) {
    const note = await this.notesRepository.findOne({ where: { id }, relations: { user: true } });

    if (!note) this.throwNotFoundException();

    if (payload.sub !== note.user.id) throw new UnauthorizedException(`You can't change delete user note.`);

    return await this.notesRepository.remove(note);
  }
}
