import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
//import { UserDTO } from '../../../models';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nev: string

    @Column()
    eletkor: number

}
