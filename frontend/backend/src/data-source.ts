import "reflect-metadata"
import { DataSource } from "typeorm"
import { Media } from "./entity/Media"
import { Customer } from "./entity/Customer"
import { Borrowing } from "./entity/Borrowing"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "asd",
    database: "videokolcsonzo",
    synchronize: true,
    logging: false,
    entities: [Media, Customer, Borrowing],
    migrations: [],
    subscribers: [],
})
