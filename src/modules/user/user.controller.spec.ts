import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserBirthdayAlertScheduleService } from '../user-birthday-alert-schedule/user-birthday-alert-schedule.service';

describe('UsersController', () => {
  let controller: UserController;

  const mockUsersService = {
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserBirthdayAlertScheduleService = {
    updateByUser: jest.fn(),
    abortByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUsersService,
        },
        {
          provide: UserBirthdayAlertScheduleService,
          useValue: mockUserBirthdayAlertScheduleService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    // arrange
    const createUserDto = {
      email: 'jhonny.cage@email.io',
      name: 'Jhonny Cage',
      date_of_birth: '1999-02-22',
      location: 'Swansea',
    } as CreateUserDto;

    const user = {
      email: 'jhonnys.cage@email.io',
      name: 'Jhonny Cage',
      date_of_birth: '1999-02-22',
      location: JSON.stringify({
        city: 'Swansea',
        city_ascii: 'Swansea',
        lat: 51.6299868,
        lng: -3.950002077,
        pop: 232611,
        country: 'United Kingdom',
        iso2: 'GB',
        iso3: 'GBR',
        province: 'Swansea',
        timezone: 'Europe/London',
      }),
      id: 1,
    } as User;

    jest.spyOn(mockUsersService, 'create').mockReturnValue(user);

    // act
    const result = await controller.store(createUserDto);

    console.log(result);

    // assert
    expect(mockUsersService.create).toBeCalled();
    expect(mockUsersService.create).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('update => should find a user by a given id and update its data', async () => {
    //arrange
    const id = 1;

    const updateUserDto = {
      location: 'Jayapura',
    } as UpdateUserDto;

    const user = {
      email: 'jhonny.cage@email.io',
      name: 'Jhonny Cage',
      date_of_birth: '1999-02-22',
      location: JSON.stringify({
        lat: -2.532986228,
        lng: 140.69998,
        pop: 152118,
        city: 'Jayapura',
        iso2: 'ID',
        iso3: 'IDN',
        country: 'Indonesia',
        province: 'Papua',
        timezone: 'Asia/Jayapura',
        city_ascii: 'Jayapura',
      }),
      id: 1,
    };

    jest.spyOn(mockUsersService, 'update').mockReturnValue(user);

    //act
    const result = await controller.update(id, updateUserDto);

    console.log(result, user);

    expect(result).toEqual(user);
    expect(mockUsersService.update).toBeCalled();
    expect(mockUsersService.update).toBeCalledWith(id, updateUserDto);
  });

  it('remove => should find a user by a given id, remove and then return undefined', async () => {
    const id = 454545;

    const user = {
      email: 'jhonny.cage@email.io',
      name: 'Jhonny Cage',
      date_of_birth: '1999-02-22',
      location: JSON.stringify({
        lat: -2.532986228,
        lng: 140.69998,
        pop: 152118,
        city: 'Jayapura',
        iso2: 'ID',
        iso3: 'IDN',
        country: 'Indonesia',
        province: 'Papua',
        timezone: 'Asia/Jayapura',
        city_ascii: 'Jayapura',
      }),
      id: 1,
    };

    jest.spyOn(mockUsersService, 'delete').mockReturnValue(user);

    //act
    const result = await controller.destroy(id);

    expect(result).toEqual(undefined);
    expect(mockUsersService.delete).toBeCalled();
    expect(mockUsersService.delete).toBeCalledWith(id);
  });
});
