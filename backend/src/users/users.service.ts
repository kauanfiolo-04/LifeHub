import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  throwNotFoundException(): never {
    throw new NotFoundException('Note not found!');
  }

  create(dto: CreateUserDTO) {
    const note = {
      id: randomUUID().toString(),
      ...dto,
      createdAt: new Date()
    };

    this.users.push(note);

    return note;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(note => note.id === id);
  }

  update(id: string, dto: UpdateUserDTO) {
    const note = this.users.find(note => note.id === id);

    if (!note) this.throwNotFoundException();

    const newNotes = this.users.map(n => {
      if (n.id === note.id) {
        return { ...n, ...dto };
      }

      return n;
    });

    this.users = newNotes;

    return this.users.find(note => note.id === id);
  }

  remove(id: string) {
    const note = this.users.find(note => note.id === id)!;

    this.users = this.users.filter(n => n.id !== note.id);

    return note;
  }
}
