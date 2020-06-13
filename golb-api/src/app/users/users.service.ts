import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from './user.entity';
import { CreateUserDto, UserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getById(id: number): Promise<UserDto> {
        const user = await this.usersRepository.findOne(id);

        if (!user)
            return;

        const userDto = new UserDto();
        userDto.id = user.id;
        userDto.firstName = user.firstName;
        userDto.lastName = user.lastName;
        userDto.username = user.username;
        userDto.email = user.email;
        userDto.creationDate = user.creationDate;
        userDto.lastLogin = user.lastLogin;
        userDto.lastLogout = user.lastLogout;
        userDto.profilePhotoUrl = user.profilePhotoUrl;
        return userDto;
    }

    getByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
        return this.usersRepository.findOne({
            where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
    }

    async getAll(take: number = 200, skip: number = 0): Promise<UserDto[]> {
        const users = await this.usersRepository.find({
            take: take,
            skip: skip
        });

        return users.map(u => {
            const userDto = new UserDto();
            userDto.id = u.id;
            userDto.firstName = u.firstName;
            userDto.lastName = u.lastName;
            userDto.username = u.username;
            userDto.email = u.email;
            userDto.creationDate = u.creationDate;
            userDto.lastLogin = u.lastLogin;
            userDto.lastLogout = u.lastLogout;
            userDto.profilePhotoUrl = u.profilePhotoUrl;
            return userDto;
        });
    }

    async create(dto: CreateUserDto): Promise<UserDto> {
        const errors = await validate(dto);

        if (errors.length > 0)
            throw errors[0];

        const user = this.usersRepository.create(dto);
        return this.usersRepository.save(user);
    }

    async update(updateUserDto: UpdateUserDto): Promise<UserDto> {
        const errors = await validate(updateUserDto);

        if (errors.length > 0)
            throw errors[0];

        const user = await this.usersRepository.findOne(updateUserDto.id);
        if (!user)
            return;

        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;
        user.username = updateUserDto.username;
        user.email = updateUserDto.email;
        return this.usersRepository.save(user);
    }

    async delete(id: number): Promise<number> {
        const deleteResult = await this.usersRepository.softDelete(id);
        return deleteResult.affected;
    }
}
