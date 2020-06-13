export class UserDto {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePhotoUrl: string;
    creationDate: Date;
    lastLogin: Date;
    lastLogout: Date;
}