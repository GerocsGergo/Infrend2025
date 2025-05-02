import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Customer } from "./entity/Customer"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "asd",
    database: "videokolcsonzo",
    synchronize: true,
    logging: false,
    entities: [User, Customer],
    migrations: [],
    subscribers: [],
})
