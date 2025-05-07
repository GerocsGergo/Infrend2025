import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Media } from "./Media";
import { Customer } from "./Customer";
import { BorrowingDTO } from "../../../models";

@Entity()
export class Borrowing implements BorrowingDTO {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Media)
  @JoinColumn({ name: "sorszam" })
  media: Media;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "azonosito" })
  customer: Customer;

  @Column({ type: 'date', nullable: false })
  kolcsonzes_datuma: Date;

  @Column({ type: 'date', nullable: true })
  visszahozas_datuma: Date | null;

  sorszam: number;
  azonosito: number;

/*   constructor() {
    this.sorszam = this.media ? this.media.sorszam : 0;  // Ha van media, hozzuk el a sorszamot
    this.azonosito = this.customer ? this.customer.azonosito : 0;  // Ha van customer, hozzuk el az azonosito-t
  } */
}

