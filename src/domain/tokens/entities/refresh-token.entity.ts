import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/domain/users/entities/user.entity';

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
    user: Promise<UserEntity>;
}
