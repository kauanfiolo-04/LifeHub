import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  ILike,
  Raw,
  Repository
} from 'typeorm';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { NotesSortBy } from './enum/notes-sort-by';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Note not found!');
  }

  async getDetail(id: string, payload: JwtPayload) {
    const detailedItem = await this.findOne(id, { user: true }, { user: { id: true } });

    if (payload.sub !== detailedItem.user.id)
      throw new UnauthorizedException(`You can't get data from another user's task.`);

    return detailedItem;
  }

  async create(dto: CreateNoteDTO, payload: JwtPayload) {
    const newNote = this.notesRepository.create({
      ...dto,
      user: { id: payload.sub }
    });

    await this.notesRepository.save(newNote);

    return newNote;
  }

  async findAll(payload: JwtPayload, search?: string, orderBy?: NotesSortBy) {
    let order: FindOptionsOrder<Note> | undefined;

    const where: FindOptionsWhere<Note>[] = [];

    const baseWhere: FindOptionsWhere<Note> = {
      user: { id: payload.sub }
    };

    switch (orderBy) {
      case NotesSortBy.CREATED_AT:
        order = { createdAt: 'desc' };
        break;

      case NotesSortBy.UPDATED_AT:
        order = { updatedAt: 'desc' };
        break;

      default:
        order = { createdAt: 'desc' };
        break;
    }

    if (search) {
      where.push(
        {
          ...baseWhere,
          title: ILike(`%${search}%`)
        },
        {
          ...baseWhere,
          content: ILike(`%${search}%`)
        },
        {
          ...baseWhere,
          tags: Raw(
            alias => `EXISTS (
              SELECT 1
              FROM unnest(${alias}) AS tag
              WHERE tag ILIKE :search
            )`,
            { search: `%${search}%` }
          )
        }
      );
    } else {
      where.push(baseWhere);
    }

    return await this.notesRepository.find({ where, order });
  }

  async findOne(id: string, relations?: FindOptionsRelations<Note>, select?: FindOptionsSelect<Note>) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations,
      select
    });

    if (!note) this.throwNotFoundException();

    return note;
  }

  async update(id: string, dto: UpdateNoteDTO, payload: JwtPayload) {
    const note = await this.findOne(id, { user: true }, { user: { id: true } });

    if (!note) this.throwNotFoundException();

    if (payload.sub !== note.user.id) throw new UnauthorizedException(`You can't change another user note.`);

    Object.assign(note, dto);

    const response = await this.notesRepository.save(note);

    const { user: _, ...data } = response;

    return data;
  }

  async remove(id: string, payload: JwtPayload) {
    const note = await this.findOne(id, { user: true }, { user: { id: true } });

    if (!note) this.throwNotFoundException();

    if (payload.sub !== note.user.id) throw new UnauthorizedException(`You can't change delete user note.`);

    return await this.notesRepository.remove(note);
  }
}
