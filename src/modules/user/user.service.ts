import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<User> {
    const userData = this.userRepository.create(user);

    return this.userRepository.save(userData);
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, user);

    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException('User is not found!');
    }

    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User is not found!');
    }

    await this.userRepository.delete(id);
  }
}
