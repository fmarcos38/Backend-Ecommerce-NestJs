import { registerAs } from "@nestjs/config";


export default registerAs('config', () => {
    return{
        //puedo agrupar variables q pertenezcan a siertos caract
        //por ejem estas son de la DB
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        postgres: {
            postgresDB: process.env.POSTGRES_DB,
            postgresUser: process.env.POSTGRES_USER,
            postegresPassword: process.env.POSTGRES_PASSWORD,
            postgresPort: parseInt(process.env.POSTGRES_PORT, 10),
            postgresHost: process.env.POSTGRES_HOST,
        },
        apikey: process.env.API_KEY,
    }    
});