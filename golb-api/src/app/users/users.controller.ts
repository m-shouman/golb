import { Controller, Get, Post, Body, Request, Req, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service'
import { UserDto, CreateUserDto, UpdateUserDto } from './dto';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    async get(): Promise<UserDto[]> {
        return await this.usersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<UserDto> {
        return await this.usersService.getById(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto);
    }

    @Put()
    async update(@Body() updateUserDto: UpdateUserDto) {
        this.usersService.update(updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.usersService.delete(id);
    }
}
