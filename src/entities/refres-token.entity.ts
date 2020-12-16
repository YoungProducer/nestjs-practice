import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('refreshTokens')
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @ManyToOne(
        () => UserEntity,
        user => user.refreshTokens,
    )
    user: UserEntity;
}
