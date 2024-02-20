import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { StoreUserDto } from './dto/store-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: StoreUserDto): Promise<User> {
    const userData = this.userRepository.create(user);

    return this.userRepository.save(userData);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
