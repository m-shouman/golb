import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    username: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}