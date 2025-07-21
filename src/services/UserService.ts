import axios from "axios"

export class UserService{
    private static URL:string ='https://dummyjson.com/users'

    public static getAllUser(){
        let userURL:string=`${this.URL}`
        return axios.get(userURL)
    }

    public static getUser(userId:string){
        let userURL:string=`${this.URL}/${userId}`
        return axios.get(userURL)
    }
}