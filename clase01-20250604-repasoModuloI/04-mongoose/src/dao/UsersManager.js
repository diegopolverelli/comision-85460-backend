import { usersModel } from "./models/users.model.js";

export class UsersManager{

    static async getUsers(){
        return await usersModel.find()
    }

    static async getUserByEmail(email){
        return await usersModel.findOne({email:email})
    }

    static async createUser(user){
        return await usersModel.create(user)
    }


    // getUsers2(){
    //     console.log(`Prueba`)
    // }
}

// let usersManager=new UsersManager()
// usersManager.getUsers2()

