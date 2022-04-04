import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';
import { Post } from './post';

export interface IComment{
    text: string;
    like: number;
    dislike: number;
    postId: number;
    authorId: number;

}

@Entity('Comments', { database: 'okten' })
export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
        nullable: false,
        width: 255,
    })
        like: number;

    @Column({
        type: 'int',
        nullable: false,
        width: 255,
    })
        dislike: number;

    @Column({
        type: 'int',
    })
        authorId: number;

    @Column({
        type: 'int',
    })
        postId: number;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user:User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post:Post;
}
