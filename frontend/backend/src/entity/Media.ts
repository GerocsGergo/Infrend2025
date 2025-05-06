import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { MediaDTO } from '../../../models';

@Entity()
export class Media implements MediaDTO{

    @PrimaryGeneratedColumn()
    sorszam: number;

    @Column()
    cim: string;
    
    @Column()
    beszerzes_datuma: Date;

    @Column({
        type: 'enum',
        enum: ['kazetta', 'DVD']
    })
    tipus: 'kazetta' | 'DVD';

    @Column({
        type: 'enum',
        enum: ['szabad', 'kikölcsönzött', 'selejtezett'],
        default: 'szabad'
    })
    statusz: 'szabad' | 'kikölcsönzött' | 'selejtezett';

}