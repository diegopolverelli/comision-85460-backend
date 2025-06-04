import mongoose from "mongoose"

export const connDB=async(urlMongo, dbName)=>{
    try {
        await mongoose.connect(
            urlMongo,
            {
                dbName: dbName, 
            }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
