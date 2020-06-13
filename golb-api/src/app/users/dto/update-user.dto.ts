import { IsEmail, IsNotEmpty, Min, IsNumber } from "class-validator";

export class UpdateUserDto {
    @Min(1)
    @IsNumber()
    id: number;
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    username: string;
    @IsEmail()
    email: string;
}