import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { CustomerDTO } from '../../../models';

@Entity()
export class Customer implements CustomerDTO{

    @PrimaryGeneratedColumn()
    azonosito: number;

    @Column()
    nev: string;
    
    @Column()
    telefonszam: string;

    @Column()
    szemelyiszam: string;

    @Column()
    lakcim: string;

    @Column()
    statusz: string;
}