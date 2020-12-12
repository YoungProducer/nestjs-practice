import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        nullable: false,
    })
    email!: string;

    @Column({
        nullable: false,
    })
    name!: string;

    @Column({
        nullable: false,
    })
    hash!: string;

    @Column({
        nullable: false,
    })
    salt!: string;
}
