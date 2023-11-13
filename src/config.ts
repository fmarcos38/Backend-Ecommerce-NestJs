import { registerAs } from "@nestjs/config";


export default registerAs('config', () => {
    return{
        //puedo agrupar variables q pertenezcan a siertos caract
        //por ejem estas son de la DB
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        apikey: process.env.API_KEY,
    }    
});