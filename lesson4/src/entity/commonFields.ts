import {
    Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

export interface ICommonFields{
    id: number;
    createdAt: string;
    deletedAt?: string;
}

export class CommonFields implements ICommonFields {
    @Column({
        nullable: false,
        default: Date.now(),
    })
    @PrimaryGeneratedColumn()
        id:number;

    @CreateDateColumn()
        createdAt:string;

    @Column()
    @DeleteDateColumn({ type: 'timestamp' })
        deletedAt?: string;
}
