import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { User } from '../../user.entity';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class EmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: string): Promise<boolean> {
    const dataExist = await this.entityManager
      .getRepository(User.name)
      .createQueryBuilder(User.name)
      .where({ email: value })
      .getExists();

    return !dataExist;
  }

  defaultMessage(args: ValidationArguments): string {
    return `User with email ${args.value} already exist!`;
  }
}
