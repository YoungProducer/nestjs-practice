import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('confirmationTokens')
export class ConfirmationTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expirationDate: string;

    @ManyToOne(
        () => UserEntity,
        user => user.confirmationTokens,
    )
    user: Promise<UserEntity>;
}
