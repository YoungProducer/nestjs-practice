import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConfirmationTokenEntity } from './confirmation-token.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

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

    @Column({
        type: 'boolean',
        default: false,
    })
    verified!: boolean;

    @OneToMany(
        () => RefreshTokenEntity,
        token => token.user,
        {
            cascade: true,
        },
    )
    refreshTokens: Promise<RefreshTokenEntity[]>;

    @OneToMany(
        () => ConfirmationTokenEntity,
        token => token.user,
        {
            cascade: true,
        },
    )
    confirmationTokens: Promise<ConfirmationTokenEntity[]>;
}
