import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: 'profile_photo_url', nullable: true })
    profilePhotoUrl: string;

    @CreateDateColumn({ name: 'creation_date' })
    creationDate: Date;

    @Column({ name: 'last_login', nullable: true  })
    lastLogin: Date;

    @Column({ name: 'last_logout' , nullable: true })
    lastLogout: Date;

    @Column({ name: 'is_deleted', default: false })
    isDeleted: boolean;
}