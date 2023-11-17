import { MongoClient } from "mongodb"
import config from '../config.js'

class CnxMongoDB {
    static client = null
    static connection = false
    static db = null // Base de datos de trabajo

    static conectar = async _ => {
        try {
            console.log('Conectando a la base de datos...')
            CnxMongoDB.client = new MongoClient(config.STRCNX) // Devuelve el objeto de conexion
            await CnxMongoDB.client.connect() // Realiza conexion
            console.log('Base de datos conectada!')

            CnxMongoDB.db = CnxMongoDB.client.db(config.BASE)
            CnxMongoDB.connection = true
        }
        catch(error) {
            console.log(`Error en la conexión de base de datos: ${error.message}`)
        }
    }

    static desconectar = _ => {
        
    }
}

export default CnxMongoDB