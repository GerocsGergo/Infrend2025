import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { CustomerDTO } from '../../../models';

@Entity()
export class Customer implements CustomerDTO{

    @PrimaryGeneratedColumn()
    azonosito: number;

    @Column()
    nev: string;
    
    @Column({ type: 'varchar', length: 30, unique: true })
    telefonszam: string;

    @Column({ type: 'varchar', length: 30, unique: true })
    szemelyiszam: string;

    @Column()
    lakcim: string;

    @Column({ type: 'varchar', length: 30, default: 'aktiv'})
    statusz: string;
}