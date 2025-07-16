import mongoose from "mongoose"
export const connDB=async(urlMongo, db)=>{
    try {
        await mongoose.connect(
            urlMongo,
            {
                dbName: db
            }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
