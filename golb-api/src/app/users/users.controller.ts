import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service'
import { UserDto } from './dto';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }

    @Get()
    async get(): Promise<UserDto[]> {
        return await this.usersService.getAll();
    }
}
